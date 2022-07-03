function delay(n) {
	n = n || 2000;

	return new Promise(done => {
		setTimeout(() => {
			done();
		}, n);
	});
}

class App {
  constructor() {
    barba.init({
      transitions: [
        {
          name: "opacity-transition",
					
					once: (data) => {
						const pathname = data.next.url.path.split('/')[2] || "home.html";
						const exceptId = pathname.split('.')[0];
						console.log(pathname)
						this.resetNavbar(exceptId);
					},

          leave: async (data) => {
            gsap.to(data.current.container, {
              opacity: 0,
              display: "none",
            });

          },
					
          enter: async (data) => {
						gsap.from(data.next.container, {
							opacity: 0,
            });
          },
        },
      ],

      views: [
        {
          namespace: "navbar",
					
					beforeLeave: (data) => {
						this.resetNavbar(data.trigger.id)
					},
        },
      ],
    });
  }

	resetNavbar(exceptId) {
		[...document.querySelector('.nav-list').children].forEach(elem => {
			if (elem.id != exceptId)
				elem.classList.remove('current');
			else
				elem.classList.add('current');
		})
	}
}

window.onload = () => {
  new App();
};
