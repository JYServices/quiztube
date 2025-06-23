'use client';

import { useState } from 'react';


export default function TestQuiz() {
    const [form, setForm] = useState({
        title: '',
        category: '',
        level: '',
        description: '',
        length: '',
        author: '',
        thumbnail: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/makequiz/test', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            if (!res.ok) {
                throw new Error('Failed to submit');
            }
            alert("되벼렸다")
        } catch (err) {
            alert(`Error: ${err.message}`);
        }
    };

    const inputClass =
        "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 px-3 py-2";
    const labelClass = "block text-sm font-medium text-gray-700 mb-1";
    const formGroupClass = "mb-4";

    return (
        <form
            className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md"
            onSubmit={handleSubmit}
        >
            <div className={formGroupClass}>
                <label className={labelClass}>
                    Title:
                    <input name="title" value={form.title} onChange={handleChange} required className={inputClass} />
                </label>
            </div>
            <div className={formGroupClass}>
                <label className={labelClass}>
                    Category:
                    <input name="category" value={form.category} onChange={handleChange} required className={inputClass} />
                </label>
            </div>
            <div className={formGroupClass}>
                <label className={labelClass}>
                    Level:
                    <select name="level" value={form.level} onChange={handleChange} required className={inputClass}>
                        <option value="">Select level</option>
                        <option value="easy">easy</option>
                        <option value="medium">medium</option>
                        <option value="hard">hard</option>
                    </select>
                </label>
            </div>
            <div className={formGroupClass}>
                <label className={labelClass}>
                    Description:
                    <textarea name="description" value={form.description} onChange={handleChange} required className={inputClass} />
                </label>
            </div>
            <div className={formGroupClass}>
                <label className={labelClass}>
                    Length:
                    <input name="length" type="number" value={form.length} onChange={handleChange} required className={inputClass} />
                </label>
            </div>
            <div className={formGroupClass}>
                <label className={labelClass}>
                    Author:
                    <input name="author" value={form.author} onChange={handleChange} required className={inputClass} />
                </label>
            </div>
            <div className={formGroupClass}>
                <label className={labelClass}>
                    Thumbnail URL:
                    <input name="thumbnail" value={form.thumbnail} onChange={handleChange} required className={inputClass} />
                </label>
            </div>
            <button
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition"
            >
                Submit
            </button>
        </form>
    );
}