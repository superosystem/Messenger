import { mount } from '@vue/test-utils'
import LoginPage from '@/views/LoginPage'

describe('LoginPage.vue', () => {
  it('should render correct contents', () => {
    // const Constructor = Vue(LoginPage)
    // const vm = new Constructor().$mount()
    const wrapper = mount(LoginPage)
    expect(wrapper.element.querySelector('h1').textContent).toEqual('TaskAgile')
    // expect(vm.$el.querySelector('h1').textContent)
    //   .toEqual('TaskAgile')
  })
})
