
export default {
	name: 'RLAddTemplate',
	data: function() {
		return {
			siteurl: 'https://spb.hh.ru/account/login?backurl=%2F',
			page: `
			<body xmlns:b="http://hhru.github.com/bloko/" class=" light-page-wrapper s-friendly xs-friendly custom-font-allowed">
   <script>
      window.globalVars = window.globalVars || {};
      window.globalVars.performance = window.globalVars.performance || {};
      window.globalVars.performance.pageWasActive = document.visibilityState === "visible";
      
      document.addEventListener("visibilitychange", function(e) {
          if (document.visibilityState !== "visible") {
              window.globalVars.performance.pageWasActive = false;
          }
      });
   </script><script data-name="HHC/Debug/Grid" data-params=""></script>
   <div class="HHC-Debug-Grid grid-absolute g-hidden ">
      <div class="bloko-columns-wrapper">
         <div class="bloko-column bloko-column_xs-4 bloko-column_s-8 bloko-column_m-12 bloko-column_l-16 bloko-column_container">
            <div class="grid__columns-wrapper">
               <div class="bloko-column bloko-column_xs-1 bloko-column_s-1 bloko-column_m-1 bloko-column_l-1">
                  <div class="grid__column"></div>
               </div>
               <div class="bloko-column bloko-column_xs-1 bloko-column_s-1 bloko-column_m-1 bloko-column_l-1">
                  <div class="grid__column"></div>
               </div>
               <div class="bloko-column bloko-column_xs-1 bloko-column_s-1 bloko-column_m-1 bloko-column_l-1">
                  <div class="grid__column"></div>
               </div>
               <div class="bloko-column bloko-column_xs-1 bloko-column_s-1 bloko-column_m-1 bloko-column_l-1">
                  <div class="grid__column"></div>
               </div>
               <div class="bloko-column bloko-column_xs-0 bloko-column_s-1 bloko-column_m-1 bloko-column_l-1">
                  <div class="grid__column"></div>
               </div>
               <div class="bloko-column bloko-column_xs-0 bloko-column_s-1 bloko-column_m-1 bloko-column_l-1">
                  <div class="grid__column"></div>
               </div>
               <div class="bloko-column bloko-column_xs-0 bloko-column_s-1 bloko-column_m-1 bloko-column_l-1">
                  <div class="grid__column"></div>
               </div>
               <div class="bloko-column bloko-column_xs-0 bloko-column_s-1 bloko-column_m-1 bloko-column_l-1">
                  <div class="grid__column"></div>
               </div>
               <div class="bloko-column bloko-column_xs-0 bloko-column_s-0 bloko-column_m-1 bloko-column_l-1">
                  <div class="grid__column"></div>
               </div>
               <div class="bloko-column bloko-column_xs-0 bloko-column_s-0 bloko-column_m-1 bloko-column_l-1">
                  <div class="grid__column"></div>
               </div>
               <div class="bloko-column bloko-column_xs-0 bloko-column_s-0 bloko-column_m-1 bloko-column_l-1">
                  <div class="grid__column"></div>
               </div>
               <div class="bloko-column bloko-column_xs-0 bloko-column_s-0 bloko-column_m-1 bloko-column_l-1">
                  <div class="grid__column"></div>
               </div>
               <div class="bloko-column bloko-column_xs-0 bloko-column_s-0 bloko-column_m-0 bloko-column_l-1">
                  <div class="grid__column"></div>
               </div>
               <div class="bloko-column bloko-column_xs-0 bloko-column_s-0 bloko-column_m-0 bloko-column_l-1">
                  <div class="grid__column"></div>
               </div>
               <div class="bloko-column bloko-column_xs-0 bloko-column_s-0 bloko-column_m-0 bloko-column_l-1">
                  <div class="grid__column"></div>
               </div>
               <div class="bloko-column bloko-column_xs-0 bloko-column_s-0 bloko-column_m-0 bloko-column_l-1">
                  <div class="grid__column"></div>
               </div>
            </div>
         </div>
      </div>
   </div>

   <div class="light-page light-page_promo">
      <script>
         window.globalVars = window.globalVars || {};
         window.globalVars.lux = {};
         window.globalVars.lux.preloadModules = ["../../pages/AccountLogin/AccountLogin.route.jsx"];
      </script>
      <div id="HH-React-Root">
         <div data-qa="lux-container lux-container-rendered">
            <div class="bloko-columns-wrapper">
               <div class="bloko-column bloko-column_xs-4 bloko-column_s-2 bloko-column_m-4 bloko-column_l-6">
                  <div class="bloko-gap bloko-gap_s-top bloko-gap_m-top bloko-gap_l-top">
                     <div class="light-page-header"><a class="light-page-header__logo" href="/"><span class="light-page-header__img"><span class="supernova-logo supernova-logo_inversed supernova-logo_hh-ru" title="hh.ru"></span></span></a></div>
                     <div class="support-chat-login-wrapper">
                        <div class="support-chat support-chat_lightpage g-hidden">Онлайн-консультант</div>
                     </div>
                  </div>
               </div>
               <div class="bloko-column bloko-column_xs-4 bloko-column_s-4 bloko-column_m-4 bloko-column_l-4">
                  <div class="bloko-gap bloko-gap_s-top bloko-gap_s-bottom bloko-gap_m-top bloko-gap_m-bottom bloko-gap_l-top bloko-gap_l-bottom">
                     <div class="light-page-content">
                        <div class="light-page-content__title light-page-content__title_labeled-form">Вход в личный кабинет</div>
                        <form autocomplete="on" data-qa="account-login-form" method="POST" novalidate="">
                           <input type="hidden" name="_xsrf" value="ee2881f9e43b28cdf8849c884bcd7918"><input type="hidden" name="backUrl" value="https://spb.hh.ru/"><input type="hidden" name="failUrl" value="/account/login?backurl=%2F"><input type="hidden" name="remember" value="yes"><input type="hidden" name="username" value=""><input type="hidden" name="password" value="">
                           <div class="bloko-form-item"><input type="text" value="" autocapitalize="off" autocorrect="off" data-qa="login-input-username" inputmode="email" placeholder="Email или телефон" spellcheck="false" class="bloko-input"></div>
                           <div class="bloko-form-item"><span class="bloko-input-wrapper"><input type="password" value="" data-qa="login-input-password" placeholder="Пароль" class="bloko-input bloko-input_password"><span class="bloko-icon-dynamic" data-qa="bloko-input-password-icon"><button type="button" class="bloko-icon-link"><span class="bloko-icon bloko-icon_view bloko-icon_initial-impact bloko-icon_highlighted-action"></span></button></span></span></div>
                           <div class="g-hidden">
                              <input type="hidden" name="isBot" value="false">
                              <div class="bloko-form-row">
                                 <div class="account-recaptcha"></div>
                              </div>
                           </div>
                           <div class="bloko-form-row"><button class="bloko-button bloko-button_primary bloko-button_stretched" type="submit" data-qa="account-login-submit">Войти&nbsp;в&nbsp;личный&nbsp;кабинет</button></div>
                           <div class="login-remember login-remember_applicant"><label class="bloko-checkbox"><input type="checkbox" data-qa="account-login-remember" class="bloko-checkbox__input" value="" checked=""><span class="bloko-checkbox__text">Запомнить</span></label><a data-qa="account-login-remember-password" href="/account/remember_password?backurl=%2F">Получить пароль</a></div>
                           <div class="social-icons-wrapper social-icons-wrapper_full">
                              <span class="social-icon-wrap">
                                 <span>
                                    <!--noindex-->
                                 </span>
                                 <a rel="nofollow" data-qa="account-login-social-mail" title="Мой Мир@mail.ru" class="bloko-social-icon bloko-social-icon_mail bloko-social-icon_small" href="/account/connect?backurl=%2F&amp;site=MAIL&amp;_xsrf=ee2881f9e43b28cdf8849c884bcd7918&amp;hhtmSource=account_login"></a>
                                 <span>
                                    <!--/noindex-->
                                 </span>
                              </span>
                              <span class="social-icon-wrap">
                                 <span>
                                    <!--noindex-->
                                 </span>
                                 <a rel="nofollow" data-qa="account-login-social-ok" title="Одноклассники" class="bloko-social-icon bloko-social-icon_ok bloko-social-icon_small" href="/account/connect?backurl=%2F&amp;site=OK&amp;_xsrf=ee2881f9e43b28cdf8849c884bcd7918&amp;hhtmSource=account_login"></a>
                                 <span>
                                    <!--/noindex-->
                                 </span>
                              </span>
                              <span class="social-icon-wrap">
                                 <span>
                                    <!--noindex-->
                                 </span>
                                 <a rel="nofollow" data-qa="account-login-social-fb" title="Facebook" class="bloko-social-icon bloko-social-icon_fb bloko-social-icon_small" href="/account/connect?backurl=%2F&amp;site=FB&amp;_xsrf=ee2881f9e43b28cdf8849c884bcd7918&amp;hhtmSource=account_login"></a>
                                 <span>
                                    <!--/noindex-->
                                 </span>
                              </span>
                              <span class="social-icon-wrap">
                                 <span>
                                    <!--noindex-->
                                 </span>
                                 <a rel="nofollow" data-qa="account-login-social-vk" title="ВКонтакте" class="bloko-social-icon bloko-social-icon_vk bloko-social-icon_small" href="/account/connect?backurl=%2F&amp;site=VK&amp;_xsrf=ee2881f9e43b28cdf8849c884bcd7918&amp;hhtmSource=account_login"></a>
                                 <span>
                                    <!--/noindex-->
                                 </span>
                              </span>
                              <span class="social-icon-wrap">
                                 <span>
                                    <!--noindex-->
                                 </span>
                                 <a rel="nofollow" data-qa="account-login-social-li" title="LinkedIn" class="bloko-social-icon bloko-social-icon_li bloko-social-icon_small" href="/account/connect?backurl=%2F&amp;site=LI&amp;_xsrf=ee2881f9e43b28cdf8849c884bcd7918&amp;hhtmSource=account_login"></a>
                                 <span>
                                    <!--/noindex-->
                                 </span>
                              </span>
                              <span class="social-icon-wrap">
                                 <span>
                                    <!--noindex-->
                                 </span>
                                 <a rel="nofollow" data-qa="account-login-social-gplus" title="Google" class="bloko-social-icon bloko-social-icon_gplus bloko-social-icon_small" href="/account/connect?backurl=%2F&amp;site=GPLUS&amp;_xsrf=ee2881f9e43b28cdf8849c884bcd7918&amp;hhtmSource=account_login"></a>
                                 <span>
                                    <!--/noindex-->
                                 </span>
                              </span>
                              <span class="social-icon-wrap">
                                 <span>
                                    <!--noindex-->
                                 </span>
                                 <a rel="nofollow" data-qa="account-login-social-dnr" title="Доктор на работе" class="bloko-social-icon bloko-social-icon_dnr bloko-social-icon_small" href="/account/connect?backurl=%2F&amp;site=DNR&amp;_xsrf=ee2881f9e43b28cdf8849c884bcd7918&amp;hhtmSource=account_login"></a>
                                 <span>
                                    <!--/noindex-->
                                 </span>
                              </span>
                           </div>
                        </form>
                        <div class="account-register">
                           <div><span class="account-hint">Регистрация</span></div>
                           <div class="">
                              <div class="account-register__button"><a class="bloko-button bloko-button_small bloko-button_stretched" type="button" data-qa="account-login-signup" href="/account/signup?backurl=%2F">Соискателя</a></div>
                              <div class="account-register__button"><a class="bloko-button bloko-button_small bloko-button_stretched" type="button" data-qa="account-login-signup-employer" href="/auth/employer/?backurl=%2F">Работодателя</a></div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div class="bloko-column bloko-column_xs-4 bloko-column_s-8 bloko-column_m-12 bloko-column_l-16">
                  <div class="light-page-footer">
                     <div class="light-page-footer__copyright" data-qa="copyright">© 2020 Группа компаний HeadHunter</div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
   <div class="light-page-footer__counters">
     
   </div>
   <script>
      if (window.performance && window.performance.mark) {
          window.performance.mark('fmp_body');
      }
   </script>
   <div class="Bloko-Notification-Manager bloko-notification-manager"></div>
   <div class="bloko-media-marker"></div>
</body>`,
			name: '',
			listElement: [],
			pagePrev: true,
			step: 1,
			step2: '',
			step3: '',
			step4: '',
			step5: '',
			text2: '',
			text3: '',
			text4: '',
			text5: '',
			
		}
	},
	mounted() {
		let step=this
		
		let vm = document.getElementById('pagePrev');
		vm.addEventListener('click', function (e) {
			if(step.step == 2){step.step2 = 'input#login-form-username.text.medium-field'}
			if(step.step == 3){step.step3 = 'input#login-form-password.text.medium-field'}
			if(step.step == 4){step.step4 = 'input#login.aui-button.aui-button-primary'}
			if(step.step > 1){step.step = step.step + 1}
			e.preventDefault();
			
		});

	
	},
	methods: {
		openUrl(){
			this.$http.get( `/OpenUrl?url=${this.siteurl}` ).then((res) => {
				this.page = res.data.pageSource
			})
			this.pagePrev=true
			this.step++;
			
		},
		getTypes(){
			this.$http.get( `/Types` ).then((res) => {
				console.log(res)
			})
		},
		saveTemplate(){
			this.step = 1;
			this.page = '<div  style="width:100%; line-height: 40px; background: #0057b6; color: #fff; text-align: center;">Шаблон успешно сохранен</div>'
		},
		getTemplates(){
			this.$http.get('/Templates/1')
			.then(function (response) {
				console.log(response);
			})
			.catch(function (error) {
				console.log(error);
			});
		}
	},
	watch: {
		'$route'( to, from ) {
		},
		
		
	}
};
