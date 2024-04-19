
( function () {
  const doc = document
  const rootEl = doc.documentElement
  const body = doc.body
  const lightSwitch = doc.getElementById( 'lights-toggle' )
  /* global ScrollReveal */
  const sr = window.sr = ScrollReveal()

  rootEl.classList.remove( 'no-js' )
  rootEl.classList.add( 'js' )

  window.addEventListener( 'load', function () {
    body.classList.add( 'is-loaded' )
  } )

  // show logins
  doc.querySelectorAll( '.callToAction' ).forEach( ( el ) => {
    el.addEventListener( 'click', toggleLogins )
  } )

  function toggleLogins () {
    let logins = doc.getElementsByClassName( 'logins' ),
      heroMedia = doc.getElementsByClassName( 'hero-media-container' )    
    toggleElementVisibility( heroMedia)
    toggleElementVisibility(logins)
      
  }

  function toggleElementVisibility ( elements ) {
    Array.from( elements ).forEach( el => {
      const status = el.style.display
      el.style.display = ['block',""].includes(status) ? 'none' : 'block'      
      console.log(el)
    })
  }

  // Reveal animations
  function revealAnimations () {
    sr.reveal( '.feature', {
      duration: 600,
      distance: '20px',
      easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
      origin: 'right',
      viewFactor: 0.2
    } )
  }

  if ( body.classList.contains( 'has-animations' ) ) {
    window.addEventListener( 'load', revealAnimations )
  }

  // Light switcher
  if ( lightSwitch ) {
    window.addEventListener( 'load', checkLights )
    lightSwitch.addEventListener( 'change', checkLights )
  }

  function checkLights () {
    let labelText = lightSwitch.parentNode.querySelector( '.label-text' )
    if ( lightSwitch.checked ) {
      body.classList.remove( 'lights-off' )
      if ( labelText ) {
        labelText.innerHTML = 'Dark'
      }
    } else {
      body.classList.add( 'lights-off' )
      if ( labelText ) {
        labelText.innerHTML = 'Light'
      }
    }
  }
}() )
