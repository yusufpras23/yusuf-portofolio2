'use client'
import Card from '../../../../../components/card';
import ConfigDialog from '../../../../../components/ConfirmDialog'
import { useState } from 'react'
import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function AdminUsersForm() {
    const editorRef = useRef(null);
    const [modal, setModal] = useState(false)
    const [modalTitle, setModalTitle] = useState("")
    const [modalMessage, setModalMessage] = useState("")
    const [data, setData] = useState({
        title:'',
        subTitle:'',
        content:'',
    });

    const clearData = ()=>{
        setData({
            name:'',
            phone:'',
            email:'',
            status:'',
            password:'',
            confirm_password:'',
        })
    }

    const inputHandler= (e) =>{
        setData({...data, [e.target.name]: e.target.value })
    }

    const onCancel=()=>{
        setModal(false)
        setModalTitle('')
        setModalMessage('')
        clearData()
    }

    async function onSubmitData() {
        try{
            if (editorRef.current) {
                const body = data
                body.content = editorRef.current.getContent();

                let res = await fetch('/api/blogs', {
                    method:'POST',
                    body: JSON.stringify(body),
                })

                let resData = await res.json()
                if(!resData.data){
                throw Error(resData.message)
                }
                setModal(true)
                setModalTitle('Info')
                setModalMessage(resData.message)
            }
        }catch(err){
          console.error("ERR", err.message)
          setModal(true)
          setModalTitle('Err')
          setModalMessage(err.message)
        }
      }

    return (
    <>

        <Card title="Blogs Form">
            <div className="w-full my-2">
                <label>Title</label>
                    <input 
                        name='title'
                        value={data.title}
                        onChange={inputHandler}
                        type="text" 
                        className="w-full border my-input-text"/>
            </div>

            <div className="w-full my-2">
                <label>Sub Title</label>
                    <input 
                        name='subTitle'
                        value={data.subTitle}
                        onChange={inputHandler}
                        className="w-full border my-input-text"/>
            </div>

            <div className="w-full my-2">
                <label>Content</label>
                <Editor
                    id='content'
                    apiKey='hz9os6h0p1826jcqknks4q1fm8yl9khctaa7nmexkf0rnx2e'
                    onInit={(_evt, editor) => editorRef.current = editor}
                    initialValue={data.content}
                    init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                    ],
                    toolbar: 'undo redo | blocks | ' +
                        'bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                />
            </div>

            <button  className="btn-primary" onClick={onSubmitData}>
                <span className="relative text-sm font-semibold text-white">
                    Save Data
                </span>
            </button>
        </Card>

        <ConfigDialog  
            onOkOny={()=>onCancel()} 
            showDialog={modal}
            title={modalTitle}
            message={modalMessage}
            onCancel={()=>onCancel()} 
            onOk={()=>onCancel()} 
            isOkOnly={true} />
    </>
    )
}