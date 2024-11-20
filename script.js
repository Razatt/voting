let photo1Votes = 0;
let photo2Votes = 0;

function vote(photo) {
    if (photo === 'photo1') {
        photo1Votes++;
        document.getElementById('photo1-votes').textContent = photo1Votes;
    } else if (photo === 'photo2') {
        photo2Votes++;
        document.getElementById('photo2-votes').textContent = photo2Votes;
    }
}




















function updateImage(imageNumber) {
    const fileInput = document.getElementById(`image-input-${imageNumber}`);
    const imageElement = document.getElementById(`image-${imageNumber}`);
    const file = fileInput.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        imageElement.src = e.target.result; // Update the image source
      };
      reader.readAsDataURL(file);
    }
  }

  




// Comment section script
functio
document.getElementById('commentForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const userName = document.getElementById('userName').value;
    const commentText = document.getElementById('commentText').value;
    
    if(userName && commentText) {
      const commentElement = document.createElement('div');
      commentElement.innerHTML = `<strong>${userName}</strong>: ${commentText}`;
      document.getElementById('commentsSection').appendChild(commentElement);
      
      // Clear the form fields
      document.getElementById('userName').value = '';
      document.getElementById('commentText').value = '';
    }
  });
