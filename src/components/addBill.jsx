import { useState, useEffect } from "react"

export default function CardAddBill(props){
    const { selectedFriend, updateBalance } = props

    const [total, setTotal] = useState(0);
    const [tagihanmu, setTagihanmu] = useState(0);
    const [talangin, setTalangin] = useState("kamu");

    function handleSubmit(e){
        let hutangan = selectedFriend?.balance
        e.preventDefault()
        if (talangin == "kamu"){
            hutangan = parseInt(hutangan) + (total - tagihanmu)
        } else {
            hutangan = parseInt(hutangan) - parseInt(tagihanmu)
        }
        updateBalance(selectedFriend?.id, hutangan)
    }

    return(
        <>
        <h1 className='font-semibold text-2xl'>{`Patungan bareng si ${selectedFriend?.name}`}</h1>
        <form action="" className='mt-4 gap-5 grid grid-cols-2' onSubmit={handleSubmit}>
            <label htmlFor="total" className='p-2'>Total Tagihan</label>
            <input type="number" name="total" id="total" className='p-2' onChange={(e)=>{setTotal(e.target.value)}}/>
            <label htmlFor="tagihanmu" className='p-2'>Tagihan kamu</label>
            <input type="number" name="tagihanmu" id="tagihanmu" className='p-2' onChange={(e)=>{setTagihanmu(e.target.value)}}/>
            <label htmlFor="tagihandia" className='p-2'>Tagihan X</label>
            <input type="number" name="tagihandia" id="tagihandia" className='p-2 bg-neutral-200' value={total-tagihanmu} disabled/>
            <label htmlFor="talangin" className='p-2'>Ditalangin sama</label>
            <select name="talangin" id="talangin" className='p-2' onChange={(e)=>{setTalangin(e.target.value)}}>
              <option value="kamu">Kamu</option>
              <option value="dia">Dia</option>
            </select>
            <input type="submit" value="Submit" className='font-semibold p-4 bg-slate-500 text-white cursor-pointer hover:bg-slate-400 rounded-xl'/>
          </form>
        </>
    )
}