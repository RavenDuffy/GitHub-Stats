export const Button = ({ children, onClick }: any) => {
    const createRipple = (event: any) => {
        const button = event.currentTarget
        const circle = document.createElement('span')
        const diameter = Math.max(button.clientWidth, button.clientHeight)
        const radius = diameter / 2

        circle.style.width = circle.style.height = `${diameter}px`
        circle.style.left = `${event.clientX - (button.offsetLeft + radius)}px`
        circle.style.top = `${event.clientY - (button.offsetTop + radius)}px`
        circle.classList.add('ripple')

        const ripple = button.getElementsByClassName('ripple')[0]

        if (ripple) ripple.remove()

        button.appendChild(circle)

        if (typeof onClick === 'function') onClick() // use new onclicks
    }

    return (
        <button onClick={createRipple}>{children}</button>
    )
}