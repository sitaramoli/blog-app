import {Footer} from 'flowbite-react';
import {Link} from 'react-router-dom';
import {BsFacebook, BsInstagram, BsTwitter, BsGithub, BsLinkedin} from 'react-icons/bs';

const AppFooter = () => {
  return (
    <Footer container={true} className='border border-t-8 border-teal-500'>
      <div className='w-full max-w-7xl mx-auto'>
        <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
          <div className='mt-5'>
            <Link to='/' className='self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white'>
              <span
                className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
                Baymax's
              </span>
              Blog
            </Link>
          </div>
          <div className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6'>
            <div>
              <Footer.Title title='About'/>
              <Footer.LinkGroup col={true}>
                <Footer.Link
                  href='https://baymaxjr.netlify.app/'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Portfolio
                </Footer.Link>
                <Footer.Link
                  href='/about'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Baymax's Blog
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title='Follow Us'/>
              <Footer.LinkGroup col={true}>
                <Footer.Link
                  href='https://github.com/sitaramoli'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Github
                </Footer.Link>
                <Footer.Link
                  href='https://www.linkedin.com/in/sitaram-oli-a35740208/'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  LinkedIn
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title='Legal'/>
              <Footer.LinkGroup col>
                <Footer.Link href='#'>Privacy Policy</Footer.Link>
                <Footer.Link href='#'>Terms &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider/>
        <div className='w-full sm:flex sm:items-center sm:justify-between'>
          <Footer.Copyright
            by="Baymax's Blog"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <Footer.Icon href='https://www.facebook.com/baymax.jr' target='_blank' icon={BsFacebook}/>
            <Footer.Icon href='https://www.instagram.com/baymax.2055' target='_blank' icon={BsInstagram}/>
            <Footer.Icon href='https://twitter.com/Baymax_1998' target='_blank' icon={BsTwitter}/>
            <Footer.Icon href='https://github.com/sitaramoli' target='_blank' icon={BsGithub}/>
            <Footer.Icon href='https://www.linkedin.com/in/sitaram-oli-a35740208/' target='_blank' icon={BsLinkedin}/>
          </div>
        </div>
      </div>
    </Footer>
  );
}

export default AppFooter;