import React from 'react'
import Navbar from '../components/Navbar'
import Card from '../components/Card'
import Footer from '../components/Footer';
import { useState, useEffect } from 'react';

const Home = () => {
  const [foodItems, setFoodItems]=useState([]);
  const [foodCat, setFoodCat]=useState([]);
  const [search, setSearch] = useState('')

  const loadData=async()=>{
    let response = await fetch('http://localhost:5000/api/v1/data/foodData',{
      method:'GET',
      headers:{
        'Content-Type':"application/json"
      }
    });
    response=await response.json();
    setFoodCat(response[1]);
    setFoodItems(response[0]);
  }

  useEffect(()=>{
    loadData();
  },[])

  const onChange=(e)=>{
    setSearch(e.target.value)
  }

  return (
    <div>
      <Navbar/>
      <div className="container mt-3" style={{ maxWidth: "2000px" }}>
            <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
                <div className="carousel-inner" id='carousel'>
                    <div className="carousel-item active">
                        <img src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092" className="d-block w-100" style={{ filter: "brightness(50%)", height: "600px", objectFit: "cover" }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836" className="d-block w-100" style={{ filter: "brightness(50%)", height: "600px", objectFit: "cover" }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://images.unsplash.com/photo-1551218808-94e220e084d2" className="d-block w-100" style={{ filter: "brightness(50%)", height: "600px", objectFit: "cover" }} alt="..." />
                    </div>
                    <div className="carousel-caption d-flex justify-content-center align-items-end" style={{ zIndex: "9", bottom: "20px" }}>
                        <div className="d-flex justify-content-center w-100">
                            <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Type in..." aria-label="Search" value={search} onChange={onChange}/>      
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
        <div className='container'> {/* boootstrap is mobile first */}
        {
          foodCat
            ? foodCat.map((data) => {
              return (
                // justify-content-center
                <div className='row mb-3'>
                  <div key={data.id} className='fs-3 m-3'>
                    {data.CategoryName}
                  </div>
                  <hr id="hr-success" style={{ height: "4px", backgroundImage: "-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))" }} />
                  {foodItems ? foodItems.filter(
                    (items) => (items.CategoryName === data.CategoryName) && (items.name.toLowerCase().includes(search.toLowerCase())))
                    .map(filterItems => {
                      return (
                        <div key={filterItems.id} className='col-12 col-md-6 col-lg-3'>
                          {console.log(filterItems.url)}
                          <Card foodName={filterItems.name} item={filterItems} options={filterItems.options[0]} ImgSrc={filterItems.img} description={filterItems.description} ></Card>
                        </div>
                      )
                    }) : <div> No Such Data </div>}
                </div>
              )
            })
            : ""}
      </div>
      <Footer/>
    </div>
  )
}

export default Home
