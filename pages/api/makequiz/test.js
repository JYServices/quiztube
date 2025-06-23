import { connectDB } from "@/util/database";

export default async function handler(req, res) {
    const db = (await connectDB).db("quiztube");

    if (req.method === 'POST') {
        const { title, category, level, description, length, author, thumbnail } = req.body;

        // Validate required fields
        if (!title || !category || !level || !description || !length || !author || !thumbnail) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // 자동 생성 필드 추가
        const quiz = {
            title,
            category,
            level,
            description,
            length,
            author,
            thumbnail,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        await db.collection('quizlist').insertOne(quiz);
        
        return res.status(200).json({ message: 'Quiz created successfully', quiz });
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}