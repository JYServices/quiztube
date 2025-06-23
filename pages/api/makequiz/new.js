import { connectDB } from "@/util/database";
import sanitizeHtml from 'sanitize-html';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }

    const { title, category, level, description, length, author, thumbnail, questions } = req.body;

    const sanitizedTitle = sanitizeHtml(title || '', {
        allowedTags: [], 
        allowedAttributes: {},
    }).trim();

    const sanitizedCategory = sanitizeHtml(category || '', {
        allowedTags: [],
        allowedAttributes: {},
    }).trim();

    const validLevels = ['easy', 'medium', 'hard', '초급', '중급', '고급'];
    const sanitizedLevel = validLevels.includes(level) ? level : '';

    const sanitizedDescription = sanitizeHtml(description || '', {
        allowedTags: [],
        allowedAttributes: {},
    }).trim();

    const sanitizedAuthor = sanitizeHtml(author || '', {
        allowedTags: [],
        allowedAttributes: {},
    }).trim();

    const sanitizedThumbnail = sanitizeHtml(thumbnail || '', {
        allowedTags: [],
        allowedAttributes: {},
    }).trim();

    if (!Array.isArray(questions)) {
        return res.status(400).json({ error: '문제 배열 형식이 올바르지 않습니다.' });
    }

    const sanitizedQuestions = questions.map(q => {
        if (!q.type || !q.questionText) {
            console.warn("불완전한 문제 객체 감지:", q);
            return null;
        }

        const sanitizedQ = {
            type: sanitizeHtml(q.type, { allowedTags: [], allowedAttributes: {} }).trim(),
            questionText: sanitizeHtml(q.questionText, { allowedTags: [], allowedAttributes: {} }).trim(),
            explanation: sanitizeHtml(q.explanation || '', { allowedTags: [], allowedAttributes: {} }).trim(),
            points: Math.max(0, parseInt(q.points) || 0), 
        };

        switch (sanitizedQ.type) {
            case 'multiple-choice':
                if (Array.isArray(q.options)) {
                    sanitizedQ.options = q.options.map(opt => ({
                        text: sanitizeHtml(opt.text || '', { allowedTags: [], allowedAttributes: {} }).trim(),
                        isCorrect: !!opt.isCorrect 
                    }));
                } else {
                    sanitizedQ.options = [];
                }
                sanitizedQ.correctAnswer = sanitizeHtml(q.correctAnswer || '', { allowedTags: [], allowedAttributes: {} }).trim();
                break;
            case 'short-answer':
            case 'long-answer':
                sanitizedQ.correctAnswer = sanitizeHtml(q.correctAnswer || '', { allowedTags: [], allowedAttributes: {} }).trim();
                break;
            case 'true-false':
                sanitizedQ.correctAnswer = (q.correctAnswer === 'true' || q.correctAnswer === 'false') ? q.correctAnswer : '';
                break;
            case 'timeline':
                if (Array.isArray(q.events)) {
                    sanitizedQ.events = q.events.map(event => ({
                        year: sanitizeHtml(event.year || '', { allowedTags: [], allowedAttributes: {} }).trim(),
                        description: sanitizeHtml(event.description || '', { allowedTags: [], allowedAttributes: {} }).trim()
                    }));
                } else {
                    sanitizedQ.events = [];
                }
                break;
            default:
                console.warn(`알 수 없는 문제 유형 감지: ${sanitizedQ.type}`);
                return null; 
        }
        return sanitizedQ;
    }).filter(q => q !== null);

    if (!sanitizedTitle || !sanitizedCategory || !sanitizedLevel || !sanitizedDescription || !sanitizedAuthor || !sanitizedThumbnail || sanitizedQuestions.length === 0) {
        return res.status(400).json({ error: '필수 퀴즈 정보 또는 유효한 문제가 부족합니다.' });
    }

    const db = (await connectDB).db("quiztube");

    let quizContentInsertedId;

    try {
        const quizContentDoc = {
            questions: sanitizedQuestions, 
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        const quizContentResult = await db.collection('quizcontent').insertOne(quizContentDoc);
        quizContentInsertedId = quizContentResult.insertedId;

    } catch (error) {
        console.error("퀴즈 콘텐츠 삽입 중 오류 발생:", error);
        return res.status(500).json({ error: '퀴즈 문제 데이터 저장에 실패했습니다. 서버 오류를 확인해주세요.', details: error.message });
    }

    try {
        const quizListDoc = {
            title: sanitizedTitle, // 살균된 제목
            category: sanitizedCategory, // 살균된 카테고리
            level: sanitizedLevel, // 살균된 난이도
            description: sanitizedDescription, // 살균된 설명
            length: sanitizedQuestions.length, // 살균 후 실제 문제 수 반영
            author: sanitizedAuthor, // 살균된 작성자
            thumbnail: sanitizedThumbnail, // 살균된 썸네일 URL
            quizContentId: quizContentInsertedId,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        const quizListResult = await db.collection('quizlist').insertOne(quizListDoc);

        return res.status(201).json({
            message: '퀴즈가 성공적으로 생성되었습니다!',
            quizId: quizListResult.insertedId,
            quizContentId: quizContentInsertedId,
        });

    } catch (error) {
        console.error("퀴즈 리스트 삽입 중 오류 발생:", error);

        try {
            if (quizContentInsertedId) {
                await db.collection('quizcontent').deleteOne({ _id: quizContentInsertedId });
                console.log(`롤백 완료: quizcontent _id ${quizContentInsertedId} 가 삭제되었습니다.`);
            }
        } catch (rollbackError) {
            console.error("롤백 중 오류 발생:", rollbackError);
        }

        return res.status(500).json({ error: '퀴즈 리스트 항목 생성에 실패했습니다. 서버 오류를 확인해주세요.', details: error.message });
    }
}