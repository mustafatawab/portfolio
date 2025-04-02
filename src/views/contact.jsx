import React from 'react'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
const Contact = () => {
  return (
    <section className="py-20 bg-[#f1f5f9] dark:bg-slate-900 ">
      <div className="p-5 w-full md:w-4/5  mx-auto space-y-5">
        <h3 className='text-center text-4xl font-bold'>Book a demo call</h3>
        <main className='flex justify-center items-center'>

          <Card className='p-10 grid grid-cols-2 gap-10 w-full   lg:w-2/3'>
            <div className='space-y-5'> 
              <h4 className='text-2xl font-bold'>Contact Information</h4>
              <p className='text-gray-700 text-sm'>Feel free to reach out if you're looking for a developer, have a question, or just want to connect.</p>
            </div>
            <form action="" className='flex flex-col gap-5'>
              <span className='space-y-2'>
                <Label htmlFor='name'>Name</Label>
                <Input type='text' name='name' id='name' placeholder='Enter your full name' className='' />
              </span>

              <span className='space-y-2'>
                <Label htmlFor='email'>Email</Label>
                <Input type='email' name='email' id='email' placeholder='Enter your email address' />
              </span>


              <span className='space-y-2'>
                <Label htmlFor='message'>Message</Label>
                <Textarea placeholder="Type your message here." id='message' name='message' />
              </span>

            </form>
          </Card>

        </main>
      </div>
    </section>
  )
}

export default Contact