'use client';

import { useState } from 'react';

// === 개별 문제 유형 컴포넌트들 (이전 코드에서 가져와 여기에 그대로 사용) ===
// 이 부분은 이전 답변의 QuizEditor 컴포넌트 내부의 각 함수들을 복사해서 붙여넣으세요.
// ShortAnswerQuestion, LongAnswerQuestion, TrueFalseQuestion, MultipleChoiceQuestion, TimelineQuestion
// 이 함수들은 QuizEditorTabs 컴포넌트 외부에 두거나, 필요하다면 별도의 파일로 분리하여 import 할 수도 있습니다.

// 1. 주관식 (Short Answer)
function ShortAnswerQuestion({ question, onChange, onDelete }) {
    return (
        <div className="bg-white p-6 rounded-lg shadow mb-4 border border-gray-200">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">주관식 문제</h3>
            <div className="mb-4">
                <label htmlFor={`questionText-${question.id}`} className="block text-gray-700 text-sm font-bold mb-2">
                    문제 내용:
                </label>
                <input
                    type="text"
                    id={`questionText-${question.id}`}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="문제를 입력하세요 (예: 대한민국의 수도는?)"
                    value={question.questionText || ''}
                    onChange={(e) => onChange(question.id, { questionText: e.target.value })}
                />
            </div>
            <div className="mb-4">
                <label htmlFor={`correctAnswer-${question.id}`} className="block text-gray-700 text-sm font-bold mb-2">
                    정답:
                </label>
                <input
                    type="text"
                    id={`correctAnswer-${question.id}`}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="정답을 입력하세요 (예: 서울)"
                    value={question.correctAnswer || ''}
                    onChange={(e) => onChange(question.id, { correctAnswer: e.target.value })}
                />
            </div>
            <button
                type="button"
                onClick={() => onDelete(question.id)}
                className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                문제 삭제
            </button>
        </div>
    );
}

// 2. 장문형 (Long Answer) - 주관식과 유사하지만 입력 필드가 textarea
function LongAnswerQuestion({ question, onChange, onDelete }) {
    return (
        <div className="bg-white p-6 rounded-lg shadow mb-4 border border-gray-200">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">장문형 문제</h3>
            <div className="mb-4">
                <label htmlFor={`questionText-${question.id}`} className="block text-gray-700 text-sm font-bold mb-2">
                    문제 내용:
                </label>
                <input
                    type="text"
                    id={`questionText-${question.id}`}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="문제를 입력하세요 (예: 지구 온난화의 원인과 해결 방안에 대해 서술하시오.)"
                    value={question.questionText || ''}
                    onChange={(e) => onChange(question.id, { questionText: e.target.value })}
                />
            </div>
            <div className="mb-4">
                <label htmlFor={`correctAnswer-${question.id}`} className="block text-gray-700 text-sm font-bold mb-2">
                    예시 정답 (채점 참고용):
                </label>
                <textarea
                    id={`correctAnswer-${question.id}`}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
                    placeholder="정답의 예시를 입력하세요."
                    value={question.correctAnswer || ''}
                    onChange={(e) => onChange(question.id, { correctAnswer: e.target.value })}
                />
            </div>
            <button
                type="button"
                onClick={() => onDelete(question.id)}
                className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                문제 삭제
            </button>
        </div>
    );
}

// 3. True/False (O/X)
function TrueFalseQuestion({ question, onChange, onDelete }) {
    return (
        <div className="bg-white p-6 rounded-lg shadow mb-4 border border-gray-200">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">참/거짓 문제</h3>
            <div className="mb-4">
                <label htmlFor={`questionText-${question.id}`} className="block text-gray-700 text-sm font-bold mb-2">
                    문제 내용:
                </label>
                <input
                    type="text"
                    id={`questionText-${question.id}`}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="참 또는 거짓으로 판별할 문장을 입력하세요 (예: 물은 섭씨 100도에서 끓는다.)"
                    value={question.questionText || ''}
                    onChange={(e) => onChange(question.id, { questionText: e.target.value })}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">정답:</label>
                <div className="mt-2">
                    <label className="inline-flex items-center mr-4">
                        <input
                            type="radio"
                            className="form-radio text-blue-600"
                            name={`correctAnswer-${question.id}`}
                            value="true"
                            checked={question.correctAnswer === 'true'}
                            onChange={() => onChange(question.id, { correctAnswer: 'true' })}
                        />
                        <span className="ml-2 text-gray-700">참 (True)</span>
                    </label>
                    <label className="inline-flex items-center">
                        <input
                            type="radio"
                            className="form-radio text-blue-600"
                            name={`correctAnswer-${question.id}`}
                            value="false"
                            checked={question.correctAnswer === 'false'}
                            onChange={() => onChange(question.id, { correctAnswer: 'false' })}
                        />
                        <span className="ml-2 text-gray-700">거짓 (False)</span>
                    </label>
                </div>
            </div>
            <button
                type="button"
                onClick={() => onDelete(question.id)}
                className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                문제 삭제
            </button>
        </div>
    );
}

// 4. 객관식 (Multiple Choice) - 무제한 선택지
function MultipleChoiceQuestion({ question, onChange, onDelete }) {
    const handleOptionChange = (optionIndex, field, value) => {
        const newOptions = question.options.map((option, idx) => {
            if (idx === optionIndex) {
                return { ...option, [field]: value };
            }
            return option;
        });
        onChange(question.id, { options: newOptions });
    };

    const handleAddOption = () => {
        onChange(question.id, {
            options: [...(question.options || []), { text: '', isCorrect: false }],
        });
    };

    const handleRemoveOption = (optionIndex) => {
        const newOptions = question.options.filter((_, idx) => idx !== optionIndex);
        onChange(question.id, { options: newOptions });
    };

    const handleCorrectOptionChange = (optionIndex) => {
        const newOptions = question.options.map((option, idx) => ({
            ...option,
            isCorrect: idx === optionIndex,
        }));
        // correct Option Text도 함께 저장하여 나중에 활용 가능하게
        const correctText = newOptions.find((option) => option.isCorrect)?.text || '';
        onChange(question.id, { options: newOptions, correctAnswer: correctText });
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow mb-4 border border-gray-200">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">객관식 문제</h3>
            <div className="mb-4">
                <label htmlFor={`questionText-${question.id}`} className="block text-gray-700 text-sm font-bold mb-2">
                    문제 내용:
                </label>
                <input
                    type="text"
                    id={`questionText-${question.id}`}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="문제를 입력하세요 (예: 다음 중 수도가 아닌 도시는?)"
                    value={question.questionText || ''}
                    onChange={(e) => onChange(question.id, { questionText: e.target.value })}
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">선택지:</label>
                {question.options && question.options.map((option, index) => (
                    <div key={index} className="flex items-center mb-2 p-2 border border-gray-100 rounded-md bg-gray-50">
                        <input
                            type="radio"
                            name={`correctOption-${question.id}`}
                            checked={option.isCorrect}
                            onChange={() => handleCorrectOptionChange(index)}
                            className="mr-2 text-blue-600"
                        />
                        <input
                            type="text"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder={`선택지 ${index + 1}`}
                            value={option.text || ''}
                            onChange={(e) => handleOptionChange(index, 'text', e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={() => handleRemoveOption(index)}
                            className="ml-2 bg-red-400 hover:bg-red-600 text-white text-sm font-bold py-1 px-2 rounded-full"
                        >
                            X
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={handleAddOption}
                    className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    선택지 추가
                </button>
            </div>
            <button
                type="button"
                onClick={() => onDelete(question.id)}
                className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                문제 삭제
            </button>
        </div>
    );
}

// 5. 타임라인 문제 (Timeline Question)
function TimelineQuestion({ question, onChange, onDelete }) {
    const handleEventChange = (eventIndex, field, value) => {
        const newEvents = question.events.map((event, idx) => {
            if (idx === eventIndex) {
                return { ...event, [field]: value };
            }
            return event;
        });
        onChange(question.id, { events: newEvents });
    };

    const handleAddEvent = () => {
        onChange(question.id, {
            events: [...(question.events || []), { year: '', description: '' }],
        });
    };

    const handleRemoveEvent = (eventIndex) => {
        const newEvents = question.events.filter((_, idx) => idx !== eventIndex);
        onChange(question.id, { events: newEvents });
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow mb-4 border border-gray-200">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">타임라인 문제</h3>
            <div className="mb-4">
                <label htmlFor={`questionText-${question.id}`} className="block text-gray-700 text-sm font-bold mb-2">
                    문제 내용 (예: 다음 사건들을 시간 순서대로 나열하시오.):
                </label>
                <input
                    type="text"
                    id={`questionText-${question.id}`}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="문제를 입력하세요."
                    value={question.questionText || ''}
                    onChange={(e) => onChange(question.id, { questionText: e.target.value })}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">사건 목록 (순서는 중요하지 않습니다. 학습 시 재정렬됩니다.):</label>
                {question.events && question.events.map((event, index) => (
                    <div key={index} className="flex items-center mb-2 p-2 border border-gray-100 rounded-md bg-gray-50">
                        <input
                            type="number"
                            className="shadow appearance-none border rounded w-1/4 py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
                            placeholder="연도"
                            value={event.year || ''}
                            onChange={(e) => handleEventChange(index, 'year', e.target.value)}
                        />
                        <input
                            type="text"
                            className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="사건 설명"
                            value={event.description || ''}
                            onChange={(e) => handleEventChange(index, 'description', e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={() => handleRemoveEvent(index)}
                            className="ml-2 bg-red-400 hover:bg-red-600 text-white text-sm font-bold py-1 px-2 rounded-full"
                        >
                            X
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={handleAddEvent}
                    className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    사건 추가
                </button>
            </div>
            <button
                type="button"
                onClick={() => onDelete(question.id)}
                className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                문제 삭제
            </button>
        </div>
    );
}


export default function QuizEditorTabs() {
    // 퀴즈 메타데이터 상태 (TestQuiz의 form 상태를 가져옴)
    const [quizInfo, setQuizInfo] = useState({
        title: '',
        category: '',
        level: '',
        description: '',
        length: 0, // 문제 수로 사용될 것
        author: '',
        thumbnail: '',
    });

    // 문제 데이터 배열 상태
    const [questions, setQuestions] = useState([]);
    const [nextQuestionId, setNextQuestionId] = useState(1); // UI용 고유 ID

    // 탭 상태
    const [activeTab, setActiveTab] = useState('attributes'); // 'attributes' or 'questions'

    // Tailwind CSS 클래스 정의
    const inputClass = "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 px-3 py-2";
    const labelClass = "block text-sm font-medium text-gray-700 mb-1";
    const formGroupClass = "mb-4";

    const questionTypes = [
        { value: 'multiple-choice', label: '객관식 (무제한 선택지)' },
        { value: 'short-answer', label: '주관식 (단답형)' },
        { value: 'long-answer', label: '장문형 주관식' },
        { value: 'true-false', label: '참/거짓 (O/X)' },
        { value: 'timeline', label: '타임라인 순서 맞추기' },
    ];

    // 퀴즈 메타데이터 변경 핸들러
    const handleQuizInfoChange = (e) => {
        const { name, value } = e.target;
        setQuizInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // 문제 추가 핸들러
    const handleAddQuestion = () => {
        const newQuestion = {
            id: nextQuestionId, // UI 관리를 위한 고유 ID
            type: 'multiple-choice', // 기본 문제 유형
            questionText: '',
            options: [{ text: '', isCorrect: false }, { text: '', isCorrect: false }], // 객관식은 최소 2개 보기 제공
            correctAnswer: '',
            events: [],
            explanation: '', // 공통 해설 필드
            points: 10, // 공통 배점 필드
        };
        setQuestions((prev) => [...prev, newQuestion]);
        setNextQuestionId((prev) => prev + 1);
        setQuizInfo((prev) => ({ ...prev, length: prev.length + 1 })); // 문제 수 업데이트
    };

    // 문제 유형 변경 핸들러
    const handleQuestionTypeChange = (id, type) => {
        setQuestions(questions.map(q =>
            q.id === id ? {
                ...q,
                type: type,
                // 유형 변경 시 기존 유형에만 해당하는 필드 초기화 또는 기본값 설정
                options: type === 'multiple-choice' ? [{ text: '', isCorrect: false }, { text: '', isCorrect: false }] : undefined,
                correctAnswer: (type === 'short-answer' || type === 'long-answer' || type === 'true-false') ? '' : undefined,
                events: type === 'timeline' ? [] : undefined,
            } : q
        ));
    };

    // 개별 문제 필드 변경 핸들러
    const handleQuestionChange = (id, updatedFields) => {
        setQuestions(questions.map(q =>
            q.id === id ? { ...q, ...updatedFields } : q
        ));
    };

    // 문제 삭제 핸들러
    const handleQuestionDelete = (idToDelete) => {
        setQuestions(questions.filter(q => q.id !== idToDelete));
        setQuizInfo(prev => ({ ...prev, length: prev.length - 1 })); // 문제 수 업데이트
    };

    // 최종 제출 핸들러
    const handleSubmit = async (e) => {
        e.preventDefault();

        // 퀴즈 메타데이터와 문제 데이터를 합쳐서 서버로 보낼 최종 데이터 준비
        // UI용 `id` 필드를 제외하고, 백엔드에 필요한 필드만 포함시킬 수 있습니다.
        const preparedQuestions = questions.map(({ id, ...rest }) => ({
            ...rest,
            // (선택 사항) 객관식 문제의 경우, 'correctAnswer' 필드를 'options'에서 추출하여 백엔드로 보낼 수 있습니다.
            // if (rest.type === 'multiple-choice' && rest.options) {
            //     const correctOption = rest.options.find(opt => opt.isCorrect);
            //     return { ...rest, correctAnswer: correctOption ? correctOption.text : '' };
            // }
        }));

        const dataToSend = {
            ...quizInfo,
            length: preparedQuestions.length, // 실제 문제 수를 반영
            questions: preparedQuestions, // 문제 배열을 함께 보냄
        };

        console.log("Submitting data:", dataToSend);

        try {
            const res = await fetch('/api/makequiz/new', { // 백엔드 API 엔드포인트
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Failed to submit quiz data');
            }

            const result = await res.json();
            alert('퀴즈가 성공적으로 저장되었습니다!');
            console.log('Quiz saved:', result);
            // 폼 초기화 (선택 사항)
            setQuizInfo({
                title: '', category: '', level: '', description: '',
                length: 0, author: '', thumbnail: ''
            });
            setQuestions([]);
            setNextQuestionId(1);

        } catch (err) {
            console.error('Submission error:', err);
            alert(`Error: ${err.message}`);
        }
    };

    // 개발자용 BSON 보기 핸들러
    const handleShowBson = () => {
        // 실제로 저장될 MongoDB 구조 예시 생성
        const now = new Date();
        const quizDataId = 'ObjectId("64bxxxxxxx")'; // 예시 ObjectId
        const quizDataDoc = {
            _id: quizDataId,
            questions: questions.map(({ id, ...rest }) => ({ ...rest })),
            createdAt: `ISODate(\"${now.toISOString()}\")`,
            updatedAt: `ISODate(\"${now.toISOString()}\")`,
        };
        const quizListDoc = {
            _id: 'ObjectId("65axxxxxxx")', // 예시 ObjectId
            title: quizInfo.title,
            category: quizInfo.category,
            level: quizInfo.level,
            description: quizInfo.description,
            length: questions.length,
            author: quizInfo.author,
            thumbnail: quizInfo.thumbnail,
            quizDataId: quizDataId,
            createdAt: `ISODate(\"${now.toISOString()}\")`,
            updatedAt: `ISODate(\"${now.toISOString()}\")`,
        };
        const bsonString = `// quizData 컬렉션\n${JSON.stringify(quizDataDoc, null, 2)}\n\n// quizlist 컬렉션\n${JSON.stringify(quizListDoc, null, 2)}`;
        window.alert(bsonString);
    };

    // freeimage.host 이미지 업로드 함수 (이제 백엔드 프록시 사용)
    async function uploadToFreeImageHost(file) {
        const formData = new FormData();
        formData.append('file', file);
        const res = await fetch('/api/imageupload', {
            method: 'POST',
            body: formData,
        });
        const data = await res.json();
        if (res.ok && data.url) {
            return data.url;
        } else {
            throw new Error(data.error || '이미지 업로드 실패');
        }
    }

    // 썸네일 파일 업로드 핸들러
    const handleThumbnailFile = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        try {
            const url = await uploadToFreeImageHost(file);
            setQuizInfo(prev => ({ ...prev, thumbnail: url }));
            alert('이미지 업로드 성공!');
        } catch (err) {
            alert('이미지 업로드 실패: ' + err.message);
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-12">
            <h1 className="text-5xl font-black mb-10 text-center text-[#222] tracking-tight flex items-center justify-center gap-3">
                <svg width="40" height="40" viewBox="0 0 48 48" fill="none" className="inline-block"><rect width="48" height="48" rx="12" fill="#FF0000"/><path d="M19 16V32L33 24L19 16Z" fill="white"/></svg>
                QuizTube <span className="text-[#FF0000]">Creator</span>
            </h1>

            {/* 탭 네비게이션 */}
            <div className="flex justify-center mb-10 bg-[#f7f7f7] rounded-xl p-2 shadow-sm gap-2">
                <button
                    type="button"
                    onClick={() => setActiveTab('attributes')}
                    className={`px-7 py-3 text-lg font-semibold rounded-lg transition-all duration-200 ${
                        activeTab === 'attributes'
                            ? 'bg-[#FF0000] text-white shadow-lg scale-105'
                            : 'bg-transparent text-[#222] hover:bg-[#f1f1f1]'
                    }`}
                >
                    <span className="mr-2">⚙️</span> 퀴즈 정보
                </button>
                <button
                    type="button"
                    onClick={() => setActiveTab('questions')}
                    className={`px-7 py-3 text-lg font-semibold rounded-lg transition-all duration-200 ${
                        activeTab === 'questions'
                            ? 'bg-[#FF0000] text-white shadow-lg scale-105'
                            : 'bg-transparent text-[#222] hover:bg-[#f1f1f1]'
                    }`}
                >
                    <span className="mr-2">✍️</span> 문제 편집 <span className="ml-1 text-[#FF0000] font-bold">({quizInfo.length})</span>
                </button>
            </div>

            <form onSubmit={handleSubmit} className="">
                {/* 퀴즈 속성 탭 내용 */}
                {activeTab === 'attributes' && (
                    <div className="bg-white p-10 rounded-2xl shadow-2xl border border-gray-100 mb-8 animate-fadein">
                        <h2 className="text-2xl font-bold mb-8 text-[#222] border-b pb-4 flex items-center gap-2">
                            <span className="text-[#FF0000]">⚙️</span> 퀴즈 기본 정보
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className={formGroupClass}>
                                <label className={labelClass}>제목</label>
                                <input name="title" value={quizInfo.title} onChange={handleQuizInfoChange} required className={inputClass + ' bg-[#f9f9f9] border-none focus:ring-[#FF0000]'} placeholder="퀴즈 제목을 입력하세요" />
                            </div>
                            <div className={formGroupClass}>
                                <label className={labelClass}>카테고리</label>
                                <input name="category" value={quizInfo.category} onChange={handleQuizInfoChange} required className={inputClass + ' bg-[#f9f9f9] border-none focus:ring-[#FF0000]'} placeholder="예: 상식, IT, 역사" />
                            </div>
                            <div className={formGroupClass}>
                                <label className={labelClass}>난이도</label>
                                <select name="level" value={quizInfo.level} onChange={handleQuizInfoChange} required className={inputClass + ' bg-[#f9f9f9] border-none focus:ring-[#FF0000]'}>
                                    <option value="">난이도 선택</option>
                                    <option value="easy">초급</option>
                                    <option value="medium">중급</option>
                                    <option value="hard">고급</option>
                                </select>
                            </div>
                            <div className={formGroupClass}>
                                <label className={labelClass}>작성자</label>
                                <input name="author" value={quizInfo.author} onChange={handleQuizInfoChange} required className={inputClass + ' bg-[#f9f9f9] border-none focus:ring-[#FF0000]'} placeholder="작성자 이름" />
                            </div>
                            <div className="md:col-span-2">
                                <label className={labelClass}>설명</label>
                                <textarea name="description" value={quizInfo.description} onChange={handleQuizInfoChange} required className={inputClass + ' bg-[#f9f9f9] border-none focus:ring-[#FF0000]'} rows="3" placeholder="퀴즈에 대한 설명을 입력하세요"></textarea>
                            </div>
                            <div className="md:col-span-2">
                                <label className={labelClass}>썸네일 URL</label>
                                <div className="flex gap-2 items-center">
                                    <input name="thumbnail" value={quizInfo.thumbnail} onChange={handleQuizInfoChange} required className={inputClass + ' bg-[#f9f9f9] border-none focus:ring-[#FF0000]'} type="url" placeholder="썸네일 이미지 URL (직접 입력 또는 업로드)" />
                                    <label className="inline-block cursor-pointer bg-[#FF0000] hover:bg-[#d90000] text-white font-bold px-4 py-2 rounded transition text-sm">
                                        파일 업로드
                                        <input type="file" accept="image/*" onChange={handleThumbnailFile} className="hidden" />
                                    </label>
                                </div>
                                {quizInfo.thumbnail && (
                                    <img src={quizInfo.thumbnail} alt="썸네일 미리보기" className="mt-3 rounded shadow w-64 h-40 object-cover border" />
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* 문제 편집 탭 내용 */}
                {activeTab === 'questions' && (
                    <div className="bg-white p-10 rounded-2xl shadow-2xl border border-gray-100 animate-fadein">
                        <h2 className="text-2xl font-bold mb-8 text-[#222] border-b pb-4 flex items-center gap-2 justify-between">
                            <span className="flex items-center gap-2"><span className="text-[#FF0000]">✍️</span> 문제 목록 <span className="ml-1 text-[#FF0000] font-bold">({quizInfo.length}개)</span></span>
                            <button
                                type="button"
                                onClick={handleAddQuestion}
                                className="bg-[#FF0000] hover:bg-[#d90000] text-white font-bold py-2 px-6 rounded-lg transition duration-200 flex items-center gap-2 shadow-md"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                </svg>
                                새 문제 추가
                            </button>
                        </h2>
                        <div className="space-y-8">
                            {questions.length === 0 && (
                                <p className="text-center text-gray-400 py-10 text-lg">
                                    '새 문제 추가' 버튼을 눌러 퀴즈 문제를 생성하세요.
                                </p>
                            )}
                            {questions.map((q, index) => (
                                <div key={q.id} className="border border-[#FF0000]/30 rounded-xl p-8 bg-[#fff6f6] relative shadow-sm animate-fadein">
                                    <span className="absolute -top-4 left-6 bg-[#FF0000] text-white text-md font-bold px-5 py-1 rounded-full shadow-lg">
                                        문제 {index + 1}
                                    </span>
                                    <div className="mb-4 pt-4">
                                        <label htmlFor={`questionType-${q.id}`} className="block text-gray-700 text-sm font-bold mb-2">
                                            문제 유형 선택:
                                        </label>
                                        <select
                                            id={`questionType-${q.id}`}
                                            className={inputClass}
                                            value={q.type}
                                            onChange={(e) => handleQuestionTypeChange(q.id, e.target.value)}
                                        >
                                            {questionTypes.map((type) => (
                                                <option key={type.value} value={type.value}>
                                                    {type.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    
                                    {/* 동적으로 문제 유형별 컴포넌트 렌더링 */}
                                    {q.type === 'short-answer' && (
                                        <ShortAnswerQuestion question={q} onChange={handleQuestionChange} onDelete={handleQuestionDelete} />
                                    )}
                                    {q.type === 'long-answer' && (
                                        <LongAnswerQuestion question={q} onChange={handleQuestionChange} onDelete={handleQuestionDelete} />
                                    )}
                                    {q.type === 'true-false' && (
                                        <TrueFalseQuestion question={q} onChange={handleQuestionChange} onDelete={handleQuestionDelete} />
                                    )}
                                    {q.type === 'multiple-choice' && (
                                        <MultipleChoiceQuestion question={q} onChange={handleQuestionChange} onDelete={handleQuestionDelete} />
                                    )}
                                    {q.type === 'timeline' && (
                                        <TimelineQuestion question={q} onChange={handleQuestionChange} onDelete={handleQuestionDelete} />
                                    )}
                                    
                                    {/* 모든 문제 유형에 공통으로 들어갈 수 있는 필드 */}
                                    <div className="mt-4 bg-gray-50 p-4 rounded border border-gray-200">
                                        <label htmlFor={`explanation-${q.id}`} className="block text-gray-700 text-sm font-bold mb-2">
                                            문제 해설 (선택 사항):
                                        </label>
                                        <textarea
                                            id={`explanation-${q.id}`}
                                            className={inputClass}
                                            placeholder="이 문제에 대한 추가 해설을 입력하세요."
                                            value={q.explanation || ''}
                                            onChange={(e) => handleQuestionChange(q.id, { explanation: e.target.value })}
                                            rows="2"
                                        />
                                        <label htmlFor={`points-${q.id}`} className="block text-gray-700 text-sm font-bold mt-4 mb-2">
                                            배점 (점):
                                        </label>
                                        <input
                                            type="number"
                                            id={`points-${q.id}`}
                                            className={inputClass}
                                            value={q.points || 0}
                                            onChange={(e) => handleQuestionChange(q.id, { points: parseInt(e.target.value) || 0 })}
                                            min="0"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* 최종 저장 버튼 */}
                <div className="text-center mt-12 flex flex-col items-center gap-4">
                    <button
                        type="submit"
                        className="bg-[#FF0000] hover:bg-[#d90000] text-white font-bold py-4 px-16 rounded-full text-2xl shadow-xl hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105 tracking-wide"
                    >
                        🎉 퀴즈 생성 완료!
                    </button>
                    <button
                        type="button"
                        onClick={handleShowBson}
                        className="bg-[#222] hover:bg-[#111] text-white font-bold py-2 px-8 rounded-full text-lg shadow-md transition duration-200"
                    >
                        🛠 개발자용 bson보기
                    </button>
                </div>
            </form>
        </div>
    );
}