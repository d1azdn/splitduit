import { useEffect, useState } from 'react'

export default function CardAddTeman({ setFriend }){
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const id = crypto.randomUUID();
    const balance = "0"

    const friend = {
        "id" : id,
        "name" : name,
        "image" : image,
        "balance" : balance
    }

    function handleSubmit(e){
        e.preventDefault();
        console.log(friend)
        setFriend((friends)=>[...friends,friend])
    }
  

    return(
    <>
    <form action="" className='grid grid-cols-2 gap-5' onSubmit={handleSubmit}>
        <label htmlFor="nama" className='p-2'>Nama</label>
        <input type="text" name="nama" id="nama" className='p-2' onChange={(e)=>setName(e.target.value)} required/>

        <label htmlFor="gambar" className='p-2'>Gambar</label>
        <input type="text" name="gambar" id="gambar" className='p-2' onChange={(e)=>setImage(e.target.value)}/>

        <input type="submit" value="Tambah" className='font-semibold p-2 bg-slate-500 text-white cursor-pointer rounded-xl hover:bg-slate-400'/>
    </form>
    </>
    )
}