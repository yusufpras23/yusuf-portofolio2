"use client"
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'


const CardItem = ({ title })=>{
  return (
      <div className="cursor-pointer hover:drop-shadow-lg drop-shadow-md bg-[#E5E5E5] w-[100px] ">
          <div className="flex justify-center">
              <img 
                  className="h-[100px]"
                  src="/images/no-image-icon.jpg"/>
          </div>
          <div className="p-4 bg-white ">
              <div className="text-[18px] truncate">{title}</div>

          </div>
      </div>
  )
}

export default function Blogs() {
  const router = useRouter();
    const [data, setData] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("");


    const onFetchBlogs=async()=>{
        try{
            setLoading(true)
            let res = await fetch('/api/blogs')
            let data = await res.json()
            setData(data.data)
            setLoading(false)
        }catch(err){
            console.log('err', err)
            setData([])
            setLoading(false)
        }
    }

    useEffect(() => {
        onFetchBlogs()
    }, [])

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        router.push(`/search?query=${searchTerm}`);
      }

    const filteredData = data.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
    return (
      <>
        <h2 className="text-center text-5xl font-bold w-full mt-24 text-amber-600">YsfBlogs</h2>
        <p className="text-center margin-0 mx-auto w-3/6	">
          lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem 
          ipsum lorem ipsum lorem ipsum 
        </p>

        {/* Start Search Box */}
        <form onSubmit={handleSearchSubmit} className="flex items-center justify-center my-3 bg-gray-100">
        <div className="relative w-full max-w-2xl my-7">
          <input 
            type="search" 
            name="blogsearch"
            className="block w-full p-6 pl-10 text-lg text-gray-900 border border-gray-300 rounded-xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500" 
            placeholder="Search..."
            onChange={(e) => setSearchTerm(e.target.value)}
            required 
          />
          </div>
        </form>
        {/* End Search Box */}

        <div className="flex justify-center gap-32">
        {filteredData.map((item, key) => (
                        <div 
                        onClick={()=>router.push(`/blogs/${item._id}`)}
                        key={key}> 
                            <CardItem 
                                className="m-5 p-4 " 
                                title={item.title}
                                />
                        </div>
                    ))
                }
        </div>
      </>
    );
  }
  