import { createApp } from 'vue'
import { mount, shallowMount} from '@vue/test-utils'
import useVuelidate from '@vuelidate/core'
import { createRouter, createWebHistory } from 'vue-router'

import RegistrationPage from '@/views/RegistrationPage'
import { routes } from "@/router"

const localVue = createApp()
localVue.use(useVuelidate)

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

// Mock dependency registratioService
jest.mock('@/services/registration')

describe('RegistrationPage.vue', () => {
  let wrapper
  let logo
  let fieldUsername
  let fieldEmail
  let fieldPassword
  let buttonSubmit

  beforeEach(() => {
    wrapper = mount(RegistrationPage, {
      localVue,
      global: {
        plugins: [router]
      }
    });
    logo = wrapper.element.querySelector('.logo');
    fieldUsername = wrapper.find('#username');
    fieldEmail = wrapper.find('#email');
    fieldPassword = wrapper.find('#password');
    buttonSubmit = wrapper.element.querySelector('#submit');
  });

  // afterEach(() => {
  //   registerSpy.mockReset()
  //   registerSpy.mockRestore()
  // });

  afterAll(() => {
    jest.restoreAllMocks()
  });

  it('should render registration form', () => {
    fieldUsername.setValue('');
    fieldEmail.setValue('');
    fieldPassword.setValue('');

    expect(logo.getAttribute('src')).toEqual('/static/images/logo.png');
    expect(fieldUsername.element.value).toBe('');
    expect(fieldEmail.element.value).toBe('');
    expect(fieldPassword.element.value).toBe('');
    expect(buttonSubmit.textContent).toEqual('Create Account');
  });

  it('should contain data model with initial values', () => {
    expect(wrapper.vm.form.username).toEqual("");
    expect(wrapper.vm.form.email).toEqual("");
    expect(wrapper.vm.form.password).toEqual("");
  });

  it('should have form inputs bound with data model', async () => {
    const username = 'test';
    const email = 'test@test.com';
    const password = 'UnitTest12345';

    await fieldUsername.setValue(username)
    await fieldEmail.setValue(email)
    await fieldPassword.setValue(password)

    expect(fieldUsername.element.value).toEqual(username)
    expect(fieldEmail.element.value).toEqual(email)
    expect(fieldPassword.element.value).toEqual(password)
  });

  it('should have form submit event handler `submitForm`', async () => {
    const mockMethod = jest.spyOn(RegistrationPage.methods, 'submitForm')
    const wrapper = shallowMount(RegistrationPage)
    const buttonSubmit = wrapper.find('#submit')

    buttonSubmit.trigger('submit')

    expect(mockMethod).toHaveBeenCalled()
  });

  // it('should register when it is a new user', async () => {
  //   wrapper = shallowMount(RegistrationPage, {
  //     localVue,
  //     global: {
  //       plugins: [router]
  //     }
  //   });

  //    Create spy for registration service
  //   registerSpy = jest.spyOn(registrationService, 'registration');

  //   expect.assertions(2)
  //   const stub = jest.fn()
  //   wrapper.vm.$router.push = stub
  //   wrapper.vm.form.username = 'sunny'
  //   wrapper.vm.form.emailAddress = 'sunny@taskagile.com'
  //   wrapper.vm.form.password = 'JestRocks!'
  //   wrapper.vm.submitForm()

  //   expect(registerSpy).toBeCalled()
  //   await wrapper.vm.$nextTick()
  //   expect(stub).toHaveBeenCalledWith({name: 'LoginPage'})
  // });

  // it('should fail it is not a new user', async () => {
  //   expect.assertions(3)
  //   // In the mock, only sunny@taskagile.com is new user
  //   wrapper.vm.form.username = 'ted'
  //   wrapper.vm.form.emailAddress = 'ted@taskagile.com'
  //   wrapper.vm.form.password = 'JestRocks!'
  //   expect(wrapper.find('.failed').isVisible()).toBe(false)
  //   wrapper.vm.submitForm()
  //   expect(registerSpy).toBeCalled()
  //   await wrapper.vm.$nextTick()
  //   expect(wrapper.find('.failed').isVisible()).toBe(true)
  // });

  // it('should fail when the email address is invalid', () => {
  //   wrapper.vm.form.username = 'test'
  //   wrapper.vm.form.emailAddress = 'bad-email-address'
  //   wrapper.vm.form.password = 'JestRocks!'
  //   wrapper.vm.submitForm()
  //   expect(registerSpy).not.toHaveBeenCalled()
  // });

  // it('should fail when the username is invalid', () => {
  //   wrapper.vm.form.username = 'a'
  //   wrapper.vm.form.emailAddress = 'test@taskagile.com'
  //   wrapper.vm.form.password = 'JestRocks!'
  //   wrapper.vm.submitForm()
  //   expect(registerSpy).not.toHaveBeenCalled()
  // });

  // it('should fail when the password is invalid', () => {
  //   wrapper.vm.form.username = 'test'
  //   wrapper.vm.form.emailAddress = 'test@taskagile.com'
  //   wrapper.vm.form.password = 'bad!'
  //   wrapper.vm.submitForm()
  //   expect(registerSpy).not.toHaveBeenCalled()
  // });
})
