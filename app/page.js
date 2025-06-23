// pages/index.js (또는 quizlist를 보여주는 pages 폴더 내의 다른 파일)

import { connectDB } from "@/util/database";
import Link from 'next/link'; // Link 컴포넌트 임포트

export const dynamic = "force-dynamic"; // SSR 강제

export default async function QuizListPage() {
    const db = (await connectDB).db("quiztube");
    const result = await db.collection("quizlist").find().toArray();

    // MongoDB의 _id는 ObjectId 타입이므로, 클라이언트에서 JSON 직렬화를 위해 문자열로 변환해야 합니다.
    const quizzes = result.map(quiz => ({
        ...quiz,
        _id: quiz._id.toString(), // ObjectId를 문자열로 변환
        createdAt: quiz.createdAt?.toISOString() || null, // Date 객체도 문자열로 변환
        updatedAt: quiz.updatedAt?.toISOString() || null, // Date 객체도 문자열로 변환
    }));

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center">Quiz List</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {quizzes.length === 0 && (
                    <p className="md:col-span-3 text-center text-gray-500 text-lg">
                        아직 생성된 퀴즈가 없습니다.
                    </p>
                )}
                {quizzes.map((quiz) => (
                    <div
                        key={quiz._id}
                        className="bg-white rounded-lg shadow p-6 flex flex-col gap-3 hover:shadow-lg transition-shadow duration-300 ease-in-out"
                    >
                        {/* Link 컴포넌트를 사용하여 /quiz/{_id}/play 경로로 이동 */}
                        <Link
                            href={`/quiz/${quiz._id}/preview`}
                            className="text-xl font-semibold text-blue-600 hover:underline mb-2"
                        >
                            {quiz.title}
                        </Link>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span>{quiz.category}</span>
                            <span>·</span>
                            <span>{quiz.level}</span>
                            <span>·</span>
                            <span>{quiz.length} questions</span>
                        </div>
                        {quiz.thumbnail && ( // 썸네일이 있을 경우에만 렌더링
                            <img
                                src={quiz.thumbnail}
                                alt={quiz.title}
                                className="w-full h-40 object-cover rounded mb-2"
                            />
                        )}
                        <p className="text-gray-700 flex-1 min-h-[30px]">{quiz.description}</p>
                        <div className="flex justify-between text-xs text-gray-400 mt-2">
                            <span>{quiz.createdAt ? new Date(quiz.createdAt).toLocaleDateString() : '날짜 없음'}</span>
                            <span>{quiz.updatedAt ? new Date(quiz.updatedAt).toLocaleDateString() : '날짜 없음'}</span>
                        </div>
                        <span className="text-xs text-gray-500 mt-1">By {quiz.author}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}