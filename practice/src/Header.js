import React from 'react';


const Header = ({title}) => {
    return (
        <header >
            {title}
           
         </header>
    )
}
// const styles = StyleSheet.create({
//     divcolor: {
//         backgroundColor: 'green'
//     }
// })
Header.defaultProps={
    title:"To do List1"
}
export default Header

