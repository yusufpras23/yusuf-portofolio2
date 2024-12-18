"use client"
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'

export default function Blogsbyid() {
    const params = useParams();
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(true)
    const [comments, setComments] = useState([]);

    const initialFormComment = {
        name: "",
        email: "",
        comment: "",
        blog_id: params.id,
        role: "admin"
    };

    const [formData, setFormData] = useState(initialFormComment);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let res = await fetch('/api/comment', {
                method: 'POST',
                body: JSON.stringify(formData),
            })

            let resData = await res.json()

            alert(resData.message);

            setFormData(initialFormComment);
            fetchComments()

        } catch (error) {
            alert(error.message);
        }

    };

    const onFetchBlogs = async () => {
        try {
            setLoading(true)
            let res = await fetch(`/api/blogs/${params.id}`)
            let data = await res.json()
            setData(data.data)
            setLoading(false)
        } catch (err) {
            console.log('err', err)
            setData(null)
            setLoading(false)
        }
    }

    const fetchComments = async () => {
        try {
            const response = await fetch("/api/comment/" + params.id);

            if (!response.ok) {
                throw new Error("Failed to fetch comments");
            }
            const responseData = await response.json();
            setComments(responseData.data);
        } catch (err) {
            setComments([])
        } finally {
        }
    };

    useEffect(() => {
        onFetchBlogs()
        fetchComments()
    }, [])

    if (isLoading) return (<>Loading...</>)

    return (
        <>
            <div className='margin-0 mx-auto w-2/3'>
                <h2 className="text-center text-[32px] font-bold w-full">{data.title}</h2>
                <div className='mt-10  ' dangerouslySetInnerHTML={{ __html: data.content }} />
            </div>

            <br></br>
            <br></br>
            <br></br>


            <h1 align="center">Form Comments</h1>

            <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
                <div className="mb-4">
                    <label htmlFor="name" className="block font-medium">
                        Name:
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="block font-medium">
                        Email:
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="comment" className="block font-medium">
                        Comment:
                    </label>
                    <textarea
                        id="comment"
                        name="comment"
                        value={formData.comment}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        rows="4"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                    Submit
                </button>
            </form>

            <br></br><br></br><br></br>

            <h1>List Comments</h1>
            <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-4 py-2">Name</th>
                        <th className="border border-gray-300 px-4 py-2">Email</th>
                        <th className="border border-gray-300 px-4 py-2">Role</th>
                        <th className="border border-gray-300 px-4 py-2">Comment</th>
                    </tr>
                </thead>
                <tbody>
                    {comments.map((comment, index) => (
                        <tr key={index} className="hover:bg-gray-100">
                            <td className="border border-gray-300 px-4 py-2">{comment.name}</td>
                            <td className="border border-gray-300 px-4 py-2">{comment.email}</td>
                            <td className="border border-gray-300 px-4 py-2">{comment.role}</td>
                            <td className="border border-gray-300 px-4 py-2">{comment.comment}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </>
    );
}