const Menu = (props) => {
    return (
        <div className='menu'>
            <div className='score-menu'>{'Your score: ' + (props.snakeDots.length - 2)}</div>
            <button className='restart' onClick={props.onRestart}>Restart</button>
        </div>
    )
}

export default Menu;