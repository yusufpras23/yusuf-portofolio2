"use client"
import { useRouter, useParams } from 'next/navigation';
import Card from '../../../../../components/card';
import { useEffect, useState, useRef } from 'react';
import ConfigDialog from '../../../../../components/ConfirmDialog'
import { Editor } from '@tinymce/tinymce-react';

export default function EditUsers2() {
    const router= useRouter()
    const editorRef = useRef(null);
    const params = useParams()
    const [modal, setModal] = useState(false)
    const [modalTitle, setModalTitle] = useState("")
    const [modalMessage, setModalMessage] = useState("")
    const [isOkOnly, setIsOkOnly] = useState(true)
    const [data, setData] = useState({
        name:'',
        phone:'',
        email:'',
        status:'',
        _id:''
    });


    const fetDataById = async ()=>{
        try{
            const res = await fetch(`/api/users2/${params.id}`);
            let responseData = await res.json()
            setData(responseData.data)

        }catch(err){
            console.error("ERR", err.message)
            setModal(true)
            setModalTitle('Err')
            setModalMessage(err.message)
        }
    }

    const onCancel=()=>{
        setModal(false)
    }

    const onOkOnly=()=>{
        setModal(false)
        router.push('/admin/users2')
    }

    const inputHandler= (e) =>{
        setData({...data, [e.target.name]: e.target.value })
    }

    const onSubmitData=async ()=>{
        try{
            if (editorRef.current) {
                const body = data
                body.content = editorRef.current.getContent();

                let res = await fetch(`/api/users2/${data._id}`, {
                    method:'PUT',
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

    useEffect(()=>{
        fetDataById()
    },[])

    return (
      <>
        <Card title="Users Edit Form">
            <div className="w-full my-2">
                <label>Name</label>
                    <input 
                        name='name'
                        value={data.name}
                        onChange={inputHandler}
                        type="text" 
                        className="w-full border my-input-text"/>
            </div>

            <div className="w-full my-2">
                <label>Phone</label>
                    <input 
                        name='phone'
                        value={data.phone}
                        onChange={inputHandler}
                        className="w-full border my-input-text"/>
            </div>

            <div className="w-full my-2">
                <label>Email</label>
                    <input 
                        name='email'
                        value={data.email}
                        onChange={inputHandler}
                        className="w-full border my-input-text"/>
            </div>

            

            <button  className="btn-primary" onClick={onSubmitData}>
                <span className="relative text-sm font-semibold text-white">
                    Save Data
                </span>
            </button> 
        </Card>

        <ConfigDialog  
            onOkOny={()=>onOkOnly()} 
            showDialog={modal}
            title={modalTitle}
            message={modalMessage}
            onCancel={()=>onCancel()} 
            onOk={()=>onConfirmOk()} 
            isOkOnly={isOkOnly} />
      </>
    );
}
  