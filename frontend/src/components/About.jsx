// import React, {useContext, useEffect} from 'react'
import React from 'react'

// import noteValue from '../context/notes/noteContext'

const About = () => {
  // const a = useContext(noteValue)   // 'a' will contain the value of both info:info and update:update as object
  // useEffect(()=>{
  //   a.y();
  //   // we are writing the eslint comment to avoid getting warnings for the empty dependency [] in useEffect 
  //   // eslint-disable-next-line
  // },[])
  return (
    <div>
      {/* About us page for {a.x.name} who is {a.x.age} years old */}
      <h2 className='my-5'>About Us</h2>
      <p>
      Welcome to our notes website, the perfect place to organize and manage all your notes in one convenient location!
      At our notes website, we understand how important it is to have an efficient and organized system for keeping track of your thoughts, ideas, and important information. With our easy-to-use platform, you can create and store notes for work, school, or personal use, all in one place completely secured on the cloud.</p>
      <p>
      Our website offers a variety of features to help you stay on top of your notes. You can create different notebooks for different topics, easily search for specific notes, and even add tags to help you quickly find what you need. You can also collaborate with others by sharing your notes or notebooks with colleagues, classmates, or friends.
      Our platform is also designed to be accessible and user-friendly. Whether you are a student, a professional, or simply someone who wants to keep their thoughts organized, our notes website is the perfect tool for you. We believe that everyone should have access to a reliable and efficient notes platform, and we are proud to offer our services to users all over the world.</p>
      <p>So why wait? Sign up for our notes website today and start organizing your life one note at a time!
      </p> 
    </div>
  )
}

export default About
