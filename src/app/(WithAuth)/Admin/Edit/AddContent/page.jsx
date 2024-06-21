'use client';
import { useUser } from '@/context/Context'
import { onAuth, signUpWithEmail, writeUserData, removeData } from '@/firebase/utils'
import { uploadIMG } from '@/firebase/storage'
import { Suspense } from 'react'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import style from '@/app/page.module.css'
import Button from '@/components/Button'
import Error from '@/components/Error'
import Loader from '@/components/Loader'
import ScrollAnimation from 'react-animate-on-scroll';
import "animate.css/animate.compat.css"
import { generateUUID } from '@/utils/UIDgenerator'
import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal'
import TextEditor from '@/components/TextEditor'
import TextEditorSimple from '@/components/TextEditorSimple'

// import { useSearchParams } from 'next/navigation'






export default function Home() {



    // const Button = ({ children }) => {
    //     return <Suspense ><button className='bg-[#ffbd2f] w-[200px] p-2 rounded-[5px] inline'>
    //         {children}
    //     </button></Suspense>
    // }
    const { user, introVideo, userDB, setUserProfile, setUserSuccess, success, setUserData, postsIMG, setUserPostsIMG, item, cliente, setCliente, cart, setCart, modal, setModal } = useUser()
    const router = useRouter()

    const [counter, setCounter] = useState([''])

    //    console.log(window.location.href.split('=')[1]) 
    const [textEditor, setTextEditor] = useState(undefined)
    const [textEditor2, setTextEditor2] = useState(undefined)

    // const searchParams = useSearchParams()
    const [query, setQuery] = useState('')
    const [route, setRoute] = useState('')

    const [option, setOption] = useState('Seccion')

    const [data, setData] = useState({})
    const [data2, setData2] = useState({})
    const [data3, setData3] = useState({})

    const [dataURL, setDataURL] = useState({})
    const [dataURL2, setDataURL2] = useState({})
    const [check, setCheck] = useState(false)

    function onChangeHandler(e) {
        setData({ ...data, [e.target.name]: e.target.value })
    }


    function handlerImage(e) {
        setDataURL({
            ...dataURL,
            [e.target.name]: URL.createObjectURL(e.target.files[0]),
            file: e.target.files[0]
        })
    }



    // --------------------------mini tarjetas 2----------------------------------
    function handlerLess2() {
        let db = { ...data2 };
        delete db[`item${data2 !== undefined && Object.keys(data2).length - 1}`];
        return setData2(db)
    }

    function onChangeHandler2(e, i) {
        setData2({ ...data2, [i]: { ...data2[i], [e.target.name]: e.target.value } })
    }



    // --------------------------tarjetas 3----------------------------------

    function onChangeHandler3(e, i) {
        setData3({ ...data3, [i]: { ...data3[i], [e.target.name]: e.target.value } })
    }
    function onChangeHandler4(e, i) {
        setData3({ ...data3, [i]: { ...data3[i], paragraph: e } })
    }






    function saveFrontPage(e) {
        e.preventDefault()
        setUserSuccess('Cargando')
        writeUserData(`/Cliente/${query}/tarjetas/${route}/content`, data, setUserSuccess)
    }
    function saveMiniTarjetas(e) {
        e.preventDefault()
        setUserSuccess('Cargando')
        writeUserData(`/Cliente/${query}`, { miniTarjetas: data2 }, setUserSuccess)
    }
  


    function addContact(e) {
        e.preventDefault()
        setUserSuccess('Cargando')
        const obj = {
            [e.target[0].name]: e.target[0].value,
            [e.target[1].name]: e.target[1].value,
            [e.target[2].name]: e.target[2].value,
            [e.target[3].name]: e.target[3].value,
            [e.target[4].name]: e.target[4].value,
            [e.target[5].name]: e.target[5].value,
            [e.target[6].name]: e.target[6].value,
            [e.target[7].name]: e.target[7].value,
            [e.target[8].name]: e.target[8].value,
            [e.target[9].name]: e.target[9].value,
        }
        writeUserData(`Cliente/contactos/`, obj, setUserSuccess)
    }

    function close(e) {
        // setUserModal(false)
        // setCheck(false)
        router.back()
    }


    function deleteHandler(e, route, key, update) {
        e.preventDefault()
        setUserSuccess('Cargando')
        let val = { ...data2 }
        delete val[key]
        console.log(val)
        update(val)
        removeData(route, null, setUserSuccess)


    }



    useEffect(() => {
        if (window && typeof window !== "undefined") {
            setRoute(window.location.href.split('=')[2])
            setQuery(window.location.href.split('=')[1].split('&')[0])

        }
    })


    useEffect(() => {

        if (Object.keys(data2).length === 0 && cliente && cliente[query] && cliente[query] && cliente[query].miniTarjetas) {
            setData2({ ...cliente[query].miniTarjetas, ...data2, })
        }
        if (Object.keys(data3).length === 0 && cliente && cliente[query] && cliente[query] && cliente[query].tarjetas) {
            console.log('getData3')
            setData3({ ...cliente[query].tarjetas, ...data2, })
        }
      
    }, [textEditor, data2])
    console.log(query)
    return (

        <div className="min-h-full">

            <img src="/airplane-bg.jpg" className='fixed  w-screen h-screen bg-[#01A7EB] object-cover  ' alt="" />

            <div className="fixed top-0 left-0 flex justify-center w-full h-auto bg-[#000000b4] p-0 z-40 " >

                <div className="relative w-[95%] h-screen overflow-y-scroll lg:w-[50%] bg-white border-b border-gray-900/10 pt-16 pb-16 lg:pb-4 px-5">
                    <div className="absolute w-[50px] top-5 right-5 text-white p-1 rounded-tl-lg rounded-br-lg text-center bg-red-600" onClick={close}>
                        X
                    </div>
                    <form className="relative  pt-5" onSubmit={saveFrontPage} >
                        <div className="col-span-full">
                            <h2 className="text-base font-bold leading-7 text-gray-900  text-center p-5 ">ADMINISTRAR SECCIONES</h2>
                            <div className='flex justify-center p-5'>
                                <Suspense >
                                    <video src={data && data.url && data.url ? data.url : (cliente && cliente[query] && cliente[query].url)} className='h-[300px]' autoPlay loop muted ></video>
                                </Suspense >
                            </div>
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="last-name" className="block text-[12px] font-medium leading-6 text-gray-900">Subir Video por URL</label>
                            <input type="text" name="url" onChange={onChangeHandler} className="block w-full rounded-md border-0 p-1.5 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-[12px] sm:leading-6" defaultValue={cliente && cliente[query] && cliente[query].url} />
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="last-name" className="block text-[12px] font-medium leading-6 text-gray-900">Titulo</label>
                            <input type="text" name="titulo" onChange={onChangeHandler} className="block w-full rounded-md border-0 p-1.5 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-[12px] sm:leading-6" defaultValue={cliente && cliente[query] && cliente[query].titulo} />
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="last-name" className="block text-[12px] font-medium leading-6 text-gray-900">Subtitulo 1</label>
                            <input type="text" name="subtitulo 1" onChange={onChangeHandler} className="block w-full rounded-md border-0 p-1.5 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-[12px] sm:leading-6" defaultValue={cliente && cliente[query] && cliente[query]['subtitulo 1']} />
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="last-name" className="block text-[12px] font-medium leading-6 text-gray-900">Subtitulo 2</label>
                            <input type="text" name="subtitulo 2" onChange={onChangeHandler} className="block w-full rounded-md border-0 p-1.5 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-[12px] sm:leading-6" defaultValue={cliente && cliente[query] && cliente[query]['subtitulo 2']} />
                        </div>
                        <div className="mt-6 flex items-center justify-center gap-x-6">
                            <Button type="submit" theme="Primary">Guardar</Button>
                        </div>
                    </form>

                    <form className="relative  pt-5" onSubmit={saveMiniTarjetas} >

                        {/* ---------------------------------TARJETAS 2---------------------------------------- */}

                        <div class="inline-flex">
                            <button type='button' class="bg-red-500 text-white font-bold py-2 px-4 rounded-l" onClick={handlerLess2}>
                                -
                            </button>
                            <button type='button' class="bg-green-500 text-white font-bold py-2 px-4 rounded-r" onClick={() => setData2({ ...data2, [`item${data2 !== undefined && Object.keys(data2).length}`]: { ic: '', ip: '' } })} >
                                +
                            </button>
                        </div>
                        {data2 && data2 !== undefined && Object.values(data2).map((i, index) => {
                            return <div className="sm:col-span-3 mb-5 pb-5 border-b-[.5px] border-[#666666]">
                                <label htmlFor="first-name" className="block text-[12px] font-medium leading-6 text-gray-900">Item</label>
                                <input type="text" name={`ip`} onChange={(e) => onChangeHandler2(e, index)} className="block w-full rounded-md border-0 p-1.5 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-[12px] sm:leading-6" defaultValue={data2[`item${index}`][`ip`]} />
                                <label htmlFor="first-name" className="block text-[12px] font-medium leading-6 text-gray-900">Especificacion</label>
                                <input type="text" name={`ic`} onChange={(e) => onChangeHandler2(e, index)} className="block w-full rounded-md border-0 p-1.5 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-[12px] sm:leading-6" defaultValue={data2[`item${index}`][`ic`]} />
                            </div>
                        })
                        }
                    </form>
                </div>

            </div>
            {success === 'Cargando' && <Loader>ghfhfhj</Loader>}
        </div>
    )
}






