import Navbar from '../Navbar'
import NavItems from '../NavItems'
import ContactSection from '../ContactSection'

import NxtWatchContext from '../../contexts/NxtWatchContext'

const Layout = prop => {
  const {children} = prop
  return (
    <>
      <Navbar />
      <NxtWatchContext.Consumer>
        {value => {
          const {dark} = value
          return (
            <div
              className={`${
                dark ? 'text-[#fff]' : 'text-[#000]'
              } grid grid-cols-10`}
            >
              <div
                className={`${
                  dark ? 'bg-[#212121]' : 'bg-[#fff]'
                } hidden md:block md:col-span-2`}
              >
                <div className="py-3 px-3 h-[90vh] flex flex-col justify-between">
                  <NavItems />
                  <ContactSection />
                </div>
              </div>
              <div
                className={`${
                  dark ? 'bg-[#181818]' : 'bg-[#f9f9f9]'
                } col-span-10 md:col-span-8 h-[90vh] max-h-[90vh] overflow-y-auto max-h-[90vh]`}
              >
                {children}
              </div>
            </div>
          )
        }}
      </NxtWatchContext.Consumer>
    </>
  )
}

export default Layout
