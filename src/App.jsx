import { useEffect, useState } from 'react'
import CardAddTeman from './components/addTeman';
import CardAddBill from './components/addBill';

function CardTeman(props){
  const { setSelectedFriend, selectedFriend } = props
  const friend = {
      "id" : props.id,
      "name" : props.name,
      "image" : props.image,
      "balance" : props.balance
  }
  return(
    <>
    <div className="card flex flex-row justify-between w-full hover:bg-neutral-200 rounded-xl py-4 px-2 gap-10 duration-200">
      <img src="..." alt="..." width={50}/>
      <div className="content">
      <h1 className='font-semibold text-lg'>{props.name}</h1>
      <p className={`font-semibold ${props.balance > 0 ? 'text-green-600':'text-red-600'}`}>{
      props.balance > 0 ? 
      `${props.name} berhutang kepadamu sebanyak ${props.balance}`:
      props.balance == 0 ?
      `Kamu dan ${props.name} tidak memiliki hutang`:
      `Kamu berhutang kepada ${props.name} sebanyak ${props?.balance?.substring(1)}`
      }</p>
      </div>
      <button className='font-semibold py-2 px-4 bg-slate-500 rounded-lg text-white hover:bg-slate-300' onClick={()=>{
        selectedFriend?.id === props.id ? setSelectedFriend(null) : setSelectedFriend(friend)
        }}>
        {selectedFriend?.id === props.id ? 'Tutup' : 'Pilih'}
        </button>
    </div>
    </>
  )
}


export default function App() {
  const [friend, setFriend] = useState([]);
  const [addFriendShow, setAddFriendShow] = useState(false);

  const [selectedFriend, setSelectedFriend] = useState(null);

  useEffect(() => {
    fetch("/listTeman.json")
    .then((response)=>response.json())
    .then((data) =>{
      setFriend(data)
    })
    .catch((error)=>{
      console.log("Error while fetching.", error)
    })
  },[]);

  function updateBalance(id, newbalance){
    setFriend((prevData)=>prevData.map(entry=>entry.id == id ? {...entry, balance:newbalance.toString()} : entry))
    setSelectedFriend(null)
  }

  useEffect(()=>{
    console.log(selectedFriend)
  },[selectedFriend])

  return (
    <>
      <section className='content grid grid-cols-2 m-24 gap-5'>
        <section className='teman'>
          <div className="listteman">
            {
              friend.map((item)=>(
                <CardTeman key={item.id} id={item.id} image={item.image} name={item.name} balance={item.balance} setSelectedFriend={setSelectedFriend} selectedFriend={selectedFriend}/>
              ))
            }
            <button className='font-semibold p-4 bg-neutral-200 cursor-pointer rounded-xl hover:bg-neutral-300 mt-2' onClick={()=>{setAddFriendShow(!addFriendShow)}}>
              {addFriendShow?'Tutup':'Tambah teman'}
            </button>
          </div>
          <div className={`tambahteman bg-neutral-100 rounded-xl p-5 flex mt-2 ${addFriendShow ? '':'hidden'}`}>
            <CardAddTeman setFriend={setFriend}/>
          </div>
        </section>

        <section className={`hutang bg-neutral-100 rounded-xl p-6 ${selectedFriend  ? '':'hidden'}`}>
            <CardAddBill selectedFriend={selectedFriend} updateBalance={updateBalance}/>
        </section>
      </section>
    </>
  )
}