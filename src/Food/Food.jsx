import '../index.css';
import apple_image from '../imgs/apple.png'

const Food = (props) => {

    const style = {
        left: `${props.dot[0]}%`,
        top: `${props.dot[1]}%`,
    }

    return (
        <div className='snake-food' style={style}><img className='img' src={apple_image} alt=""/></div>
    )
}

export default Food;