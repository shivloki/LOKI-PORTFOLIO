/* =====================================================
   TYPEWRITER EFFECT
===================================================== */

const typing =
    document.getElementById("typing");


const words = [

    "BCA STUDENT",

    "JAVA FULL STACK DEVELOPER",

    "WEB DEVELOPER"

];


let wordIndex = 0;

let charIndex = 0;

let deleting = false;



function typeWriter() {

    const word =
        words[wordIndex];


    if (!deleting) {


        typing.textContent =
            word.substring(
                0,
                charIndex + 1
            );


        charIndex++;


        if (
            charIndex ===
            word.length
        ) {


            deleting = true;


            setTimeout(
                typeWriter,
                1600
            );


            return;

        }


    } else {


        typing.textContent =
            word.substring(
                0,
                charIndex - 1
            );


        charIndex--;


        if (
            charIndex === 0
        ) {


            deleting = false;


            wordIndex++;


            if (
                wordIndex >=
                words.length
            ) {

                wordIndex = 0;

            }

        }

    }


    setTimeout(

        typeWriter,

        deleting
            ? 45
            : 80

    );

}


typeWriter();



/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


const revealObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target
                            .classList
                            .add("active");

                    }

                }
            );

        },

        {

            threshold: .12

        }

    );


revealElements.forEach(
    element => {

        revealObserver.observe(
            element
        );

    }
);



/* =====================================================
   PARTICLE BACKGROUND
===================================================== */

const canvas =
    document.getElementById(
        "particles"
    );


const ctx =
    canvas.getContext("2d");


let particles = [];



function resizeCanvas() {

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;

}


resizeCanvas();



window.addEventListener(
    "resize",
    () => {

        resizeCanvas();

        createParticles();

    }
);



class Particle {


    constructor() {


        this.x =
            Math.random()
            * canvas.width;


        this.y =
            Math.random()
            * canvas.height;


        this.size =
            Math.random()
            * 2 + .5;


        this.speedX =
            (Math.random() - .5)
            * .3;


        this.speedY =
            (Math.random() - .5)
            * .3;


        this.opacity =
            Math.random()
            * .6 + .1;

    }



    update() {


        this.x +=
            this.speedX;


        this.y +=
            this.speedY;



        if (
            this.x < 0
        ) {

            this.x =
                canvas.width;

        }



        if (
            this.x >
            canvas.width
        ) {

            this.x = 0;

        }



        if (
            this.y < 0
        ) {

            this.y =
                canvas.height;

        }



        if (
            this.y >
            canvas.height
        ) {

            this.y = 0;

        }

    }



    draw() {


        ctx.beginPath();


        ctx.arc(

            this.x,

            this.y,

            this.size,

            0,

            Math.PI * 2

        );


        ctx.fillStyle =
            `rgba(
                0,
                217,
                255,
                ${this.opacity}
            )`;


        ctx.fill();

    }

}



/* =====================================================
   CREATE PARTICLES
===================================================== */

function createParticles() {


    particles = [];


    const amount =
        Math.min(

            120,

            Math.floor(
                window.innerWidth / 10
            )

        );


    for (
        let i = 0;
        i < amount;
        i++
    ) {


        particles.push(
            new Particle()
        );

    }

}


createParticles();



/* =====================================================
   ANIMATE PARTICLES
===================================================== */

function animateParticles() {


    ctx.clearRect(

        0,

        0,

        canvas.width,

        canvas.height

    );


    particles.forEach(
        particle => {

            particle.update();

            particle.draw();

        }
    );


    requestAnimationFrame(
        animateParticles
    );

}


animateParticles();



/* =====================================================
   TOP BUTTON
===================================================== */

const topButton =
    document.getElementById(
        "topButton"
    );



window.addEventListener(
    "scroll",
    () => {


        if (
            window.scrollY > 500
        ) {


            topButton
                .classList
                .add("show");


        } else {


            topButton
                .classList
                .remove("show");

        }

    }
);



topButton.addEventListener(
    "click",
    () => {


        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }
);



/* =====================================================
   FORMSPREE CONTACT FORM
===================================================== */

const contactForm =
    document.getElementById(
        "contactForm"
    );


const formStatus =
    document.getElementById(
        "formStatus"
    );


const submitButton =
    document.getElementById(
        "submitButton"
    );



if (contactForm) {


    contactForm.addEventListener(
        "submit",
        async function (event) {


            /*
                IMPORTANT:

                We prevent the normal browser redirect
                so we can show a success message on
                the same portfolio page.

                The actual data is still sent to Formspree
                using fetch().
            */

            event.preventDefault();


            const originalButtonHTML =
                submitButton.innerHTML;


            submitButton.disabled =
                true;


            submitButton.innerHTML = `

                <span>
                    Sending...
                </span>

                <i data-lucide="loader"></i>

            `;


            lucide.createIcons();



            formStatus.textContent =
                "";


            formStatus.className =
                "form-status";



            try {


                const formData =
                    new FormData(
                        contactForm
                    );


                const response =
                    await fetch(
                        contactForm.action,
                        {

                            method: "POST",

                            body: formData,

                            headers: {

                                "Accept":
                                    "application/json"

                            }

                        }
                    );



                if (
                    response.ok
                ) {


                    formStatus.textContent =
                        "Thank you! Your message has been sent successfully.";


                    formStatus.classList
                        .add("success");


                    contactForm.reset();



                } else {


                    const data =
                        await response.json()
                        .catch(
                            () => null
                        );


                    if (
                        data &&
                        data.errors
                    ) {


                        formStatus.textContent =
                            data.errors
                                .map(
                                    error =>
                                        error.message
                                )
                                .join(", ");


                    } else {


                        formStatus.textContent =
                            "Something went wrong. Please try again.";

                    }


                    formStatus.classList
                        .add("error");

                }


            } catch (error) {


                console.error(
                    "Formspree Error:",
                    error
                );


                formStatus.textContent =
                    "Unable to send the message. Please check your internet connection and try again.";


                formStatus.classList
                    .add("error");

            }



            submitButton.disabled =
                false;


            submitButton.innerHTML =
                originalButtonHTML;


            lucide.createIcons();

        }
    );

}



/* =====================================================
   PROFILE MOUSE TILT
===================================================== */

const profile =
    document.querySelector(
        ".profile-wrapper"
    );



if (profile) {


    profile.addEventListener(
        "mousemove",
        event => {


            const rect =
                profile.getBoundingClientRect();


            const x =
                event.clientX -
                rect.left;


            const y =
                event.clientY -
                rect.top;


            const centerX =
                rect.width / 2;


            const centerY =
                rect.height / 2;


            const rotateX =
                (y - centerY)
                / 20;


            const rotateY =
                (centerX - x)
                / 20;


            profile.style.transform =
                `perspective(900px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-10px)`;

        }
    );



    profile.addEventListener(
        "mouseleave",
        () => {


            profile.style.transform =
                "";

        }
    );

}



/* =====================================================
   LUCIDE ICONS
===================================================== */

if (
    typeof lucide !==
    "undefined"
) {

    lucide.createIcons();

}