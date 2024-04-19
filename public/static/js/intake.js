document.addEventListener( 'DOMContentLoaded', function () {
  document.getElementById( 'submit' ).addEventListener( 'click', function () {
    var form = document.getElementById( 'childForm' );
    var formData = new FormData( form );

    fetch( 'YOUR_CLOUD_FUNCTION_ENDPOINT', {
      method: 'POST',
      body: formData
    } )
      .then( response => response.json() )
      .then( data => {
        console.log( data );
        // Optionally, redirect user or show success message
      } )
      .catch( error => {
        console.error( 'Error:', error );
        // Optionally, show error message to user
      } );
  } );

  let file_input = document.querySelector( '#imageUpload' );
  let image_preview = document.querySelector( '.image-preview' );

  const handle_file_preview = ( e ) => {
    let files = e.target.files;
    let length = files.length;

    for ( let i = 0; i < length; i++ ) {
      let imgContainer = document.createElement( 'div' ),
        btnClose = document.createElement( 'button' )
      image = document.createElement( 'img' );

      imgContainer.id = `image-container-${i}`;
      btnClose.textContent = 'x'
      btnClose.addEventListener( 'click', ( e ) => {
        //debugger
        idx = Number( e.target.parentElement.id.split( '-' )[2] );
        // Construct a new DataTransfer object
        const dt = new DataTransfer();

        // Add files to the DataTransfer object, excluding the first one (index 0)
        for ( let file of file_input.files ) {
          if ( file !== file_input.files[idx] ) {
            dt.items.add( file );
          }
        }

        // Update the input's files with the modified list
        file_input.files = dt.files;
        e.target.parentNode.parentNode.removeChild( e.target.parentNode )
      } );
      imgContainer.classList.add( 'image-thumb-container' );
      btnClose.classList.add( 'close-btn' );
      image.classList.add( 'image-thumb' )
      // use the DOMstring for source
      image.src = window.URL.createObjectURL( files[i] );
      imgContainer.appendChild( btnClose );
      imgContainer.appendChild( image );
      image_preview.appendChild( imgContainer );
    }
  }

  file_input.addEventListener( 'change', handle_file_preview );

} );


/**
 * Handles the navigation and validation of a multi-step form.
 * 
 * The code manages the display of form tabs and panels, as well as the state of the
 * previous, next, and submit buttons based on the current step. It also validates
 * the input in the current form panel and enables or disables the navigation buttons
 * accordingly.
 */
const previousButton = document.querySelector( '#prev' )
const nextButton = document.querySelector( '#next' )
const submitButton = document.querySelector( '#submit' )
const tabTargets = document.querySelectorAll( '.tab' )
const tabPanels = document.querySelectorAll( '.tabpanel' )
const isEmpty = ( str ) => !str.trim().length
let currentStep = 0

// Validate first input on load
validateEntry()

// Next: Change UI relative to current step and account for button permissions
nextButton.addEventListener( 'click', ( event ) => {
    event.preventDefault()

    // Hide current tab
    tabPanels[ currentStep ].classList.add( 'hidden' )
    tabTargets[ currentStep ].classList.remove( 'active' )

    // Show next tab
    tabPanels[ currentStep + 1 ].classList.remove( 'hidden' )
    tabTargets[ currentStep + 1 ].classList.add( 'active' )
    currentStep += 1

    validateEntry()
    updateStatusDisplay()
} )

// Previous: Change UI relative to current step and account for button permissions
previousButton.addEventListener( 'click', ( event ) => {
    event.preventDefault()

    // Hide current tab
    tabPanels[ currentStep ].classList.add( 'hidden' )
    tabTargets[ currentStep ].classList.remove( 'active' )

    // Show previous tab
    tabPanels[ currentStep - 1 ].classList.remove( 'hidden' )
    tabTargets[ currentStep - 1 ].classList.add( 'active' )
    currentStep -= 1

    nextButton.removeAttribute( 'disabled' )
    updateStatusDisplay()
} )


function updateStatusDisplay() {
    // If on the last step, hide the next button and show submit
    if ( currentStep === tabTargets.length - 1 ) {
        nextButton.classList.add( 'hidden' )
        previousButton.classList.remove( 'hidden' )
        submitButton.classList.remove( 'hidden' )
        validateEntry()

        // If it's the first step hide the previous button
    } else if ( currentStep == 0 ) {
        nextButton.classList.remove( 'hidden' )
        previousButton.classList.add( 'hidden' )
        submitButton.classList.add( 'hidden' )
        // In all other instances display both buttons
    } else {
        nextButton.classList.remove( 'hidden' )
        previousButton.classList.remove( 'hidden' )
        submitButton.classList.add( 'hidden' )
    }
}

function validateEntry() {
    let input = tabPanels[ currentStep ].querySelector( '.form-input' )

    // Start but disabling continue button
    nextButton.setAttribute( 'disabled', true )
    submitButton.setAttribute( 'disabled', true )

    // Validate on initial function fire
    setButtonPermissions( input )

    // Validate on input
    input.addEventListener( 'input', () => setButtonPermissions( input ) )
    // Validate if bluring from input
    input.addEventListener( 'blur', () => setButtonPermissions( input ) )
}

function setButtonPermissions( input ) {
    if ( isEmpty( input.value ) ) {
        nextButton.setAttribute( 'disabled', true )
        submitButton.setAttribute( 'disabled', true )
    } else {
        nextButton.removeAttribute( 'disabled' )
        submitButton.removeAttribute( 'disabled' )
    }
}