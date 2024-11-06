import React, { useEffect, useRef, useState } from 'react'
import "./Menu.css"

function Menu({Icon, items}) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const menuRef = useRef(null)
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setIsMenuOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])
    const handleMenuItemClick = (clickFunction) => {
        clickFunction()
        setIsMenuOpen(false)
    }
  return (
    <div ref={menuRef} className='menu-container'>
        <button onClick={toggleMenu} className='menu-icon-button'>
        {Icon ? <Icon /> : '☰'}
        </button>
        {isMenuOpen && (
            <div className='menu'>
                {items.map((item, index) => (
                    <div onClick={() => handleMenuItemClick(item.onClick)} key={index} className='menu-item'>
                        {item.label}
                    </div>
                ))

                }
            </div>
        )}
    </div>
  )
}

export default Menu