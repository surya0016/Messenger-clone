import Image from 'next/image'
import img from '../../../public/images/Messenger-Logo-500x281.png'
import AuthForm from './components/AuthForm'

function page() {
  return (
    <div className="
    flex 
    flex-col
    justify-center 
    items-center 
    min-h-full
    py-12
    sm:px-6
    lg:px-8
    bg-gray-100
    ">
      <div className="
      sm:mx-auto 
      sm:w-full
      sm:max-w-md
      ">
        <Image src={img} alt='logo' width="68" height="68" className='mx-auto w-auto'/>
        <h2 className="
        mt-4 
        text-center
        text-3xl 
        font-bold
        tracking-tight
        text-gray-900
        ">Sign in to your account</h2>      
      </div>
      <AuthForm/>
    </div>
  )
}

export default page