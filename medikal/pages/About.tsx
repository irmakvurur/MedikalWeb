import React from 'react'
import Header from '../componenets/Header'
import Footer from '../componenets/Footer'
import '../app/globals.css';

const About = () => {
  return (
    <div>
        <Header/>
        <h1 className='ortala py-6'>Hakkımızda</h1>

        {/* Flexbox ile içerik ve resim yan yana */}
        <div className="content-container">
            <div className="text-content">
                <h2 className='altbaslik'>Misyon ve Vizyon:</h2>
                <p className='metin'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris at massa eros. Nunc tempus quam ac arcu porttitor fringilla.
                    Vestibulum ultrices tellus enim, et pellentesque augue convallis ac. Fusce eros eros, mattis vel pretium eu, porta id urna. <br />
                    Mauris eu semper ligula, at rutrum erat. Aliquam efficitur ante mauris, in tincidunt odio laoreet non. Pellentesque dignissim felis a dolor ultricies maximus.<br />
                    Mauris pharetra massa eget sollicitudin condimentum. Vivamus turpis mauris, fringilla vitae leo non, malesuada faucibus ante. In hac habitasse platea dictumst.<br />
                    Sed vehicula, odio sit amet scelerisque vestibulum, nisl purus tempor sem, eu suscipit justo enim eu ante.
                </p>
            </div>
            <div className="image-content">
                {/* Resim burada yer alacak */}
                <img src="/foto2.jpg" alt="About us" className="about-image" />
            </div>
        </div>

        <div className="content-container">
            <div className="text-content">
                <h2 className='altbaslik'>Kurumun Tarihçesi</h2>
                <p className='metin'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris at massa eros. Nunc tempus quam ac arcu porttitor fringilla.<br />
                    Mauris pharetra massa eget sollicitudin condimentum. Vivamus turpis mauris, fringilla vitae leo non, malesuada faucibus ante. In hac habitasse platea dictumst.<br />
                    Sed vehicula, odio sit amet scelerisque vestibulum, nisl purus tempor sem, eu suscipit justo enim eu ante.
                </p>
            </div>
            <div className="image-content">
                <img src="/foto3.jpg" alt="History" className="about-image" />
            </div>
        </div>

        <Footer/>
    </div>
  )
}

export default About;
