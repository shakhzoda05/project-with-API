import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ProductsItem from '../components/ProductsItem'
import { Empty, Input, Select } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import useDebounce from '../hook/useDebounce'


function Home() {
    const [products, setProducts]=useState([])
    const [isLoading,setIsLoading]=useState(true)
    const [searchValue,setSearchValue]=useState("")


    function handleProductsSearch(e){
        setIsLoading(true)
        setSearchValue(e.target.value)
    }
    const searchWaiting=useDebounce(searchValue,800)

// Select change start
const [categoryData,setCategoryData]=useState([])
const [categoryId,setCategoryId]=useState(null)
const onChange = (value)=> {
    setIsLoading(true)
    setTimeout(()=>setCategoryId(value),1000)
};


useEffect(()=>{
    axios.get("https://api.escuelajs.co/api/v1/categories").then(res=>{
        setCategoryData(res.data.map(item=>{
            const data={
                value:item.id,
                label:item.name
            }
            return data
        }))
    })
},[])
// Select change end


useEffect(()=>{
    axios.get(`https://api.escuelajs.co/api/v1/products/?title=${searchWaiting}&offset=0&limit=20`,{
       params:{
        categoryId:categoryId
       } 
    }).then(res=>{
        setProducts(res.data)
        setIsLoading(false)
    })
},[searchWaiting,categoryId])



  return (
    <div className='p-10'>
        <div className='mb-5 flex justify-between'>
       <Input onChange={handleProductsSearch} size='large' allowClear className='w-[350px]' name='searching' placeholder='Search products...'/>
       <Select size='large' className='w-[250px]'
    showSearch
    placeholder="Choose cateory"
    optionFilterProp="label"
    onChange={onChange}
    options={categoryData}
  />
        </div>
    <ul className="flex justify-between flex-wrap gap-5">
        {isLoading 
        ? <li className='mx-auto mt-[160px]'><LoadingOutlined className="text-blue-500" style={{fontSize:"80px"}}/></li> 
        :products.length>0 ? products.map(item=> <ProductsItem key={item.id} item={item}/>): <Empty className='block mx-auto mt-[150px]'/> }
    </ul>
    </div>
  )
}

export default Home
