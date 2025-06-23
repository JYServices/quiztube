import { NextResponse } from 'next/server';

// freeimage.host API KEY (서버에서만 보관)
const FREEIMAGE_API_KEY = '6d207e02198a847aa98d0a2a901485a5';

export const runtime = 'nodejs'; // edge 환경에서는 FormData multipart 지원이 불완전할 수 있음

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // freeimage.host에 업로드할 FormData 생성
    const uploadForm = new FormData();
    uploadForm.append('key', FREEIMAGE_API_KEY);
    uploadForm.append('action', 'upload');
    uploadForm.append('source', file);

    // freeimage.host로 업로드 요청
    const res = await fetch('https://freeimage.host/api/1/upload', {
      method: 'POST',
      body: uploadForm,
    });
    const data = await res.json();
    if (data.status_code === 200 && data.image?.url) {
      return NextResponse.json({ url: data.image.url });
    } else {
      return NextResponse.json({ error: data.status_txt || '이미지 업로드 실패' }, { status: 500 });
    }
  } catch (err) {
    return NextResponse.json({ error: err.message || '서버 오류' }, { status: 500 });
  }
}
