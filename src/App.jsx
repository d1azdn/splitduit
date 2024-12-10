import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'

function CardTeman({props, setAddBillShow}){
  return(
    <>
    <div className="card flex flex-row justify-between w-full hover:bg-neutral-200 rounded-xl py-4 px-2 gap-10 duration-200">
      <img src="..." alt="..." width={50}/>
      <div className="content">
      <h1 className='font-semibold text-lg'>Teman</h1>
      <p>Informasi</p>
      </div>
      <button className='font-semibold py-2 px-4 bg-slate-500 rounded-lg text-white hover:bg-slate-300' onClick={()=>{setAddBillShow(true)}}>Pilih</button>
    </div>
    </>
  )
}

export default function App() {
  const [count, setCount] = useState(0)
  const [friend, setFriend] = useState([])
  const [addFriendShow, setAddFriendShow] = useState(false)
  const [addBillShow, setAddBillShow] = useState(false)

  useEffect(() => {
    fetch("/listTeman.json") // No need to import, just use the public URL
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        setFriend(data); // Process your data
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      <section className='content grid grid-cols-2 m-24 gap-5'>
        <section className='teman'>
          <div className="listteman">
            {
              friend.map((item)=>{
                <CardTeman key={item.id} imgUrl={item.image} nama={item.nama} balance={item.balance} setAddBillShow={setAddBillShow}/>
              })
            }
            <button className='font-semibold p-4 bg-neutral-200 cursor-pointer rounded-xl hover:bg-neutral-300 mt-2' onClick={()=>{setAddFriendShow(!addFriendShow)}}>
              Tambah teman
            </button>
          </div>
          <div className={`tambahteman bg-neutral-100 rounded-xl p-5 flex mt-2 ${addFriendShow?'':'hidden'}`}>
            <form action="" className='grid grid-cols-2 gap-5'>
              <label htmlFor="nama" className='p-2'>Nama</label>
              <input type="text" name="nama" id="nama" className='p-2'/>

              <label htmlFor="gambar" className='p-2'>Gambar</label>
              <input type="text" name="gambar" id="gambar" className='p-2'/>

              <input type="submit" value="Tambah" className='font-semibold p-2 bg-slate-500 text-white cursor-pointer rounded-xl hover:bg-slate-400'/>
            </form>
          </div>
        </section>

        <section className={`hutang bg-neutral-100 rounded-xl p-6 ${addBillShow?'':'hidden'}`}>
          <h1 className='font-semibold text-2xl'>Patungan bareng si X</h1>
          <form action="" className='mt-4 gap-5 grid grid-cols-2'>
            <label htmlFor="total" className='p-2'>Total Tagihan</label>
            <input type="text" name="total" id="total" className='p-2'/>
            <label htmlFor="tagihanmu" className='p-2'>Tagihan kamu</label>
            <input type="text" name="tagihanmu" id="tagihanmu" className='p-2'/>
            <label htmlFor="tagihandia" className='p-2'>Tagihan X</label>
            <input type="text" name="tagihandia" id="tagihandia" className='p-2 bg-neutral-200' disabled/>
            <label htmlFor="talangin" className='p-2'>Ditalangin sama</label>
            <select name="talangin" id="talangin" className='p-2'>
              <option value="kamu">Kamu</option>
              <option value="dia">Dia</option>
            </select>
            <input type="submit" value="Submit" className='font-semibold p-4 bg-slate-500 text-white cursor-pointer hover:bg-slate-400 rounded-xl'/>
          </form>
        </section>
      </section>
    </>
  )
}