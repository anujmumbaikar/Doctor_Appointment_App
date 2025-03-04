import React from 'react'
import {assets} from '../assets/assets'
function About() {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>ABOUT <span className='text-gray-700 font-medium'>US</span></p>
      </div>
      <div className='flex my-10 flex-col md:flex-row gap-12'>
        <img src={assets.about_image} alt="" className='w-full md:max-w-[380px]' />
        <div className='flex flex-col justify-center gap-6 text-gray-600 text-sm'>
          <p className=''>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa quasi libero voluptatem illo dolore magnam consequuntur nobis reiciendis? Libero rerum necessitatibus aut nihil ipsam aspernatur aliquid vitae maiores fugiat delectus.
          Doloremque, id. Deserunt nesciunt reprehenderit sapiente corporis totam, magni numquam officiis ipsam accusamus iusto provident veritatis similique necessitatibus modi est, quae soluta a et fugiat distinctio maiores sequi optio velit!
          Animi exercitationem ut repellat rerum voluptatum officiis vel maiores, dolor culpa cupiditate consectetur dicta aspernatur. Corporis commodi, voluptates, iure excepturi facilis sunt quisquam sit quis eaque, iste magnam rem in.</p>
          <b>Our services</b>
          <p className=''>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste nemo eos sint qui repudiandae est modi hic magni quod nostrum, recusandae blanditiis ratione illum odio. Eius quod incidunt ea excepturi.
          Repudiandae voluptates, exercitationem ea laborum laudantium veniam, harum vitae maiores sint, amet est temporibus animi numquam quis expedita cupiditate. Natus sunt totam cumque reprehenderit veniam nemo, id rerum? Delectus, inventore.</p>
          <b>Our Vision</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis nam architecto, facere temporibus, repellat rerum neque voluptatem, commodi suscipit quae placeat expedita ea et eius. Ipsam consectetur odio itaque repellendus.
          Odit voluptate expedita incidunt? In enim qui odio quidem labore quas sequi vero at voluptatibus incidunt, quaerat laboriosam voluptatum repudiandae. Minus voluptates officiis dignissimos quia, iure qui unde provident praesentium.
          Perspiciatis quo repudiandae labore modi alias qui necessitatibus nobis minus similique delectus iste, placeat odio quasi officia aperiam? Voluptate eius quas ad? Minima ex atque, quidem reiciendis eveniet eius sequi?</p>
        </div>
      </div>
    </div>
  )
}

export default About