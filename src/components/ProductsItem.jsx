import { EllipsisOutlined, HeartOutlined, SaveOutlined } from '@ant-design/icons'
import Avatar from 'antd/es/avatar/avatar'
import Card from 'antd/es/card/Card'
import Meta from 'antd/es/card/Meta'
import React from 'react'

function ProductsItem({item}) {
  return (
    // <li className='w-[250px] p-5 bg-white shadow-md rounded-md'>
    //   <img className='rounded-md' src={item.images[0]} alt='img' width={200} height={300}/>
    //   <h2>Title: <b>{item.title}</b></h2>
    //   <p className='line-clamp-3'>{item.description}</p>
    //   <strong>Price:<b>{item.price}$</b></strong>
    //   <p>Category:<b>{item.category.name}</b></p>
    // </li>
    <li>
         <Card
    style={{ width: 300 }}
    cover={
      <img
        alt="example"
        src={item.images[0]}
      />
    }
    actions={[
      <EllipsisOutlined className='!scale-[1.5]' key="ellipsis" />,
      <HeartOutlined className='!scale-[1.5]' key="ellipsis" />,
      <SaveOutlined className='!scale-[1.5]' key="ellipsis"/>
    ]}
  >
    <Meta
      avatar={<Avatar src={item.category.image} />}
      title={item.title}
      description={<p className='line-clamp-4'>{item.description}</p>}
    />
  </Card>
    </li>
  )
}

export default ProductsItem
