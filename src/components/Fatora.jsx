import { useRef, useState } from "react";

export default function Product (){
  
  const [phones,setPhones] = useState([
    { id: 1, name: 'Iphone X', price: 300, qty: 5 },
    { id: 2, name: 'Iphone 10', price: 400, qty: 6 },
    { id: 3, name: 'Iphone 12', price: 500, qty: 7 },
    { id: 4, name: 'Google Pixel 6', price: 600, qty: 5 },
    { id: 5, name: 'OnePlus 9 Pro', price: 650, qty: 10 },
    { id: 6, name: 'Xiaomi Mi 11', price: 450, qty: 15 },
    { id: 7, name: 'Nokia 9 PureView', price: 400, qty: 8 },
  ])
  const [addModel,setAddModel] = useState(false);
  const [editPhoneIndex,setPhoneIndex] = useState()

let PhoneNameInput = useRef() 
let PhonePriceInput = useRef() 
let PhoneQtyInput = useRef() 

let addNewPhone = () =>{
  let newPhone = {
    name: PhoneNameInput.current.value,
    price: PhonePriceInput.current.value,
    qty: PhoneQtyInput.current.value
  }
  setPhones([...phones,newPhone])
  
  setAddModel(false)
}

let removePhone = (selectIndex) =>{
  const copy = [...phones]
  copy.splice(selectIndex,1)
  setPhones(copy)
}

let SendData = (selectIndex)=>{
PhoneNameInput.current.value = phones[selectIndex].name;
PhonePriceInput.current.value = phones[selectIndex].price;
PhoneQtyInput.current.value = phones[selectIndex].qty;
}

let editPhone = (selectIndex)=>{
let editPhoneData = {
   name: PhoneNameInput.current.value,
    price: PhonePriceInput.current.value,
    qty: PhoneQtyInput.current.value
}
const copy = [...phones]
copy.splice(selectIndex,1,editPhoneData)
setPhones(copy)
}

return(
    <>

<dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <div onClick={(e) => { e.stopPropagation() }} className="flex flex-col gap-2 rounded shadow w-full bg-white p-5">
                        <h2 className="font-extrabold text-black">Edit Phone</h2>
                        <form method="dialog" className="flex flex-col gap-2">
                            <input ref={PhoneNameInput} type="text" className="input w-full" placeholder="Enter phone name" />
                            <input ref={PhonePriceInput} type="text" className="input w-full" placeholder="Enter phone price" />
                            <input ref={PhoneQtyInput} type="text" className="input w-full" placeholder="Enter phone qty" />
                            <button onClick={()=>{editPhone(editPhoneIndex)}} className="btn btn-primary w-full">Edit Phone</button>
                        </form>
                    </div>
                </div>
            </dialog>

   <div className="min-h-screen bg-white p-10 font-sans">
      
    
      <div className="max-w-6xl mx-auto">

       
        <div className="flex flex-wrap gap-4 justify-between items-center mb-8">
          <h1 className="text-4xl font-light text-gray-700">Fatora System</h1>
          <button onClick={()=>{setAddModel(true);}} className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-5 rounded shadow-sm transition-colors">
            show Model
          </button>
        </div>

        
        <div className="shadow-xl rounded-lg border border-slate-700">
          <div className=" ">

          
          <table className="w-full text-center border-collapse min-w-[600px]">
            
            
            <thead className="bg-slate-900 text-white">
              <tr>
                <th className="p-4 border-r border-slate-700 whitespace-nowrap">-</th>
                <th className="p-4 border-r border-slate-700 whitespace-nowrap">Phones Names</th>
                <th className="p-4 border-r border-slate-700 whitespace-nowrap">Phones Price</th>
                <th className="p-4 border-r border-slate-700 whitespace-nowrap">Phones Qts</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>

           
            <tbody className="bg-slate-800 text-slate-200">
              {phones.map((phone, index) => (
                <tr key={index} className="border-b border-slate-700 hover:bg-slate-700 transition duration-150">
                  <td className="p-3 border-r border-slate-700">{index + 1}</td>
                  <td className="p-3 border-r border-slate-700 font-medium text-white">{phone.name}</td>
                  <td className="p-3 border-r border-slate-700 font-bold">{phone.price}</td>
                  <td className="p-3 border-r border-slate-700 font-bold">{phone.qty}</td>
                  <td className="p-3 flex justify-center items-center gap-2">
                    
                    <button onClick={()=>{removePhone(index)}} className="bg-rose-500 hover:bg-rose-600 text-white p-2 rounded shadow transition-colors">
                      <i class="fa-solid fa-trash"></i>
                    </button>
                    
                    <button onClick={()=>{document.getElementById('my_modal_1').showModal(); SendData(index); setPhoneIndex(index)} } className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded shadow transition-colors">
                    <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
               </div> 
                    {
                       addModel===true ?(
                          <div onClick={() => {setAddModel(false)}} className="w-full bg-gray-300/50 h-screen flex items-center justify-center fixed top-0 left-0">
                          <div  className="flex flex-col w-100  bg-white gap-3 text-white rounded-2xl p-5" onClick={(e)=>{e.stopPropagation()}}>
                           <h1 className=" text-black font-bold text-2xl">Add new phone</h1>
                         <input ref={PhoneNameInput} className=" w-full bg-black p-2.5 rounded-2xl" type="text" placeholder="Phone" />
                         <input ref={PhonePriceInput} className=" w-full bg-black p-2.5 rounded-2xl" type="text" placeholder="Price" />
                         <input ref={PhoneQtyInput} className=" w-full bg-black p-2.5 rounded-2xl" type="text" placeholder="Qty" />
                         <button onClick={addNewPhone} className=" bg-blue-700 w-full p-2.5 rounded-2xl">Add phone</button>
                </div>
               </div>
                       ) : null
                      
                    }  
        </div>

      </div>
    </div>

    </>
)
}