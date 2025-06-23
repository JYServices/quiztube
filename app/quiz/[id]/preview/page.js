import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function QuizPlayPage({ params }) {
    // Next.js 15+에서는 params가 Promise이므로 반드시 await 필요
    const resolvedParams = await params;
    const quizId = resolvedParams.id;
    const db = (await connectDB).db("quiztube");
    // 1. quizlist에서 메타데이터 조회
    const quizMeta = await db.collection("quizlist").findOne({ _id: new ObjectId(quizId) });
    if (!quizMeta) {
        return <div className="max-w-xl mx-auto py-20 text-center text-2xl text-red-600">퀴즈를 찾을 수 없습니다.</div>;
    }
    // 2. quizcontent에서 문제 배열 조회 (quizContentId, quizDataId, _id 모두 대응)
    let quizContentId = quizMeta.quizContentId || quizMeta.quizDataId || quizMeta._id;
    if (!(quizContentId instanceof ObjectId)) quizContentId = new ObjectId(quizContentId);
    const quizData = await db.collection("quizcontent").findOne({ _id: quizContentId });
    const questions = quizData?.questions || [];
    console.log("Quiz Meta:", quizMeta);
    console.log("Quiz Questions:", questions);
    console.log("Quiz Whole Content:", quizData);
    return (
        <div className="max-w-3xl mx-auto px-4 py-12">
            <div className="flex items-center gap-3 mb-8">
                <Link href="/" className="text-[#FF0000] font-bold hover:underline">← 퀴즈 목록</Link>
                <span className="text-gray-400">/</span>
                <span className="font-semibold text-lg">{quizMeta.title}</span>
            </div>
            <div className="flex flex-col md:flex-row gap-8 mb-10">
                {quizMeta.thumbnail && (
                    <img src={quizMeta.thumbnail} alt={quizMeta.title} className="w-full md:w-64 h-40 object-cover rounded-xl shadow" />
                )}
                <div className="flex-1">
                    <h1 className="text-4xl font-black mb-2 text-[#222]">{quizMeta.title}</h1>
                    <div className="flex gap-3 text-sm text-gray-500 mb-2">
                        <span>{quizMeta.category}</span>
                        <span>·</span>
                        <span>{quizMeta.level}</span>
                        <span>·</span>
                        <span>{quizMeta.length}문제</span>
                    </div>
                    <p className="text-gray-700 mb-2">{quizMeta.description}</p>
                    <span className="text-xs text-gray-400">By {quizMeta.author}</span>
                </div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <h2 className="text-2xl font-bold mb-6 text-[#FF0000]">문제 풀기</h2>
                {questions.length === 0 && (
                    <div className="text-center text-gray-400 py-10 text-lg">문제가 없습니다.</div>
                )}
                {/* 문제 목록 렌더링 */}
                <ol className="space-y-10">
                    {questions.map((q, idx) => (
                        <li key={idx} className="border-b pb-8 last:border-b-0">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="bg-[#FF0000] text-white rounded-full px-4 py-1 font-bold text-lg shadow">{idx + 1}</span>
                                <span className="font-semibold text-lg text-[#222]">{q.questionText}</span>
                            </div>
                            {/* 문제 유형별 입력 */}
                            {q.type === 'multiple-choice' && (
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                                    {q.options?.map((opt, i) => (
                                        <li key={i} className="">
                                            <label className="flex items-center gap-2 cursor-pointer p-2 rounded-lg border border-gray-200 hover:bg-[#fff3f3] transition">
                                                <input type="radio" name={`q${idx}`} value={opt.text} className="accent-[#FF0000]" />
                                                <span>{opt.text}</span>
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {q.type === 'short-answer' && (
                                <input type="text" className="mt-3 w-full border rounded px-3 py-2 focus:ring-[#FF0000]" placeholder="정답을 입력하세요" />
                            )}
                            {q.type === 'long-answer' && (
                                <textarea className="mt-3 w-full border rounded px-3 py-2 focus:ring-[#FF0000]" rows={3} placeholder="정답을 입력하세요" />
                            )}
                            {q.type === 'true-false' && (
                                <div className="flex gap-6 mt-3">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="radio" name={`q${idx}`} value="true" className="accent-[#FF0000]" /> 참
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="radio" name={`q${idx}`} value="false" className="accent-[#FF0000]" /> 거짓
                                    </label>
                                </div>
                            )}
                            {q.type === 'timeline' && (
                                <div className="mt-3">
                                    <p className="text-sm text-gray-500 mb-2">사건을 시간 순서대로 입력하세요.</p>
                                    {q.events?.map((event, i) => (
                                        <div key={i} className="flex gap-2 mb-2">
                                            <input type="number" className="w-24 border rounded px-2 py-1" placeholder="연도" defaultValue={event.year} />
                                            <input type="text" className="flex-1 border rounded px-2 py-1" placeholder="사건 설명" defaultValue={event.description} />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </li>
                    ))}
                </ol>
                {/* 실제 채점/제출 기능은 별도 구현 필요 */}
            </div>
        </div>
    );
}
