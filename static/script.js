const rectangle = document.getElementById('rectangle');
const dots = document.querySelectorAll('.dot');
const container = document.querySelector('.container');

let isDragging = false;
let currentDot = null;
let offsetX, offsetY;

dots.forEach(dot => {
    dot.addEventListener('mousedown', (e) => {
        isDragging = true;
        currentDot = dot;
        offsetX = e.clientX - parseFloat(dot.style.left);
        offsetY = e.clientY - parseFloat(dot.style.top);
        e.preventDefault();// Prevents the default action of the event from being triggered
    });
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    const minX = 0;
    const minY = 0;
    const maxX = container.clientWidth - parseFloat(currentDot.style.width);
    const maxY = container.clientHeight - parseFloat(currentDot.style.height);

    let newX = e.clientX - offsetX;
    let newY = e.clientY - offsetY;

    // Ensure dot stays within the frame boundaries
    newX = Math.min(maxX, Math.max(minX, newX));
    newY = Math.min(maxY, Math.max(minY, newY));

    currentDot.style.left = newX + 'px';
    currentDot.style.top = newY + 'px';

    switch (currentDot.id) {
        case 'dot1':
            rectangle.style.transform = `translate(${newX}px, ${newY}px)`;
            break;
        case 'dot2':
            rectangle.style.width = e.clientX - parseFloat(rectangle.style.left) + 'px';
            break;
        case 'dot3':
            rectangle.style.height = e.clientY - parseFloat(rectangle.style.top) + 'px';
            break;
        case 'dot4':
            rectangle.style.width = e.clientX - parseFloat(rectangle.style.left) + 'px';
            rectangle.style.height = e.clientY - parseFloat(rectangle.style.top) + 'px';
            break;
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    currentDot = null;
});

// window.addEventListener('beforeunload',function(e){
//     e.preventDefault()
//     e.returnValue=''

//     // creating AJAX request to call Python Destroy Function
//     //using XMLHttpRequest
//     var xhr=new XMLHttpRequest()
//     xhr.open('POST','/destroy',true)
//     xhr.onreadystatechange=function(){
//         if(xhr.readyState===XMLHttpRequest.DONE){
//             if(xhr.status===200){
//                 console.log('destroyed')
//             }
//         } else{
//             console.error('error occured: ',xhr.statusText)
//         }
//     }
// })