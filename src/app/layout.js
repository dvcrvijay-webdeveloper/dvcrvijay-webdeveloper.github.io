import { Inter, Kaushan } from "next/font/google";
import "./globals.css";
import Script from "next/script";

import "../../public/assets/css/themify-icons.css";
import "../../public/assets/css/bootstrap.css";
import "../../public/assets/vendor/animate/animate.css";

import "../../public/assets/vendor/nice-select/css/nice-select.css";
import "../../public/assets/vendor/fancybox/css/jquery.fancybox.min.css";
import "../../public/assets/css/virtual.css";
import "../../public/assets/css/topbar.virtual.css";
import "../../public/assets/css/style.css";
import "../../public/assets/css/custom.css";



const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "``DotCoders... - Full Stack Developer | Web Design | Web Development",
  description: "web design, web development, php, laravel, wordpress, Full Stack Developer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <title>Vijay Chakaravarthy - Freelance WordPress, PHP & Laravel Developer</title>

        <meta name="description" content="Professional Freelance Full Stack Developer specializing in WordPress, PHP, and Laravel bug fixes, website development, and performance optimization. Fast and reliable service." />

        <meta name="keywords" content="WordPress developer, PHP developer, Laravel developer, fix WordPress errors, fix PHP bugs, freelance web developer, full stack developer India, Vijay Chakaravarthy" />

        <meta name="author" content="Vijay Chakaravarthy" />

        <link rel="shortcut icon" href="/faviconN.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" /> 
        <link
          href="https://fonts.googleapis.com/css2?family=Kaushan+Script&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
          integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />        

      </head>
      <body className="theme-blue">{children}</body>
      <Script src="assets/js/jquery-3.5.1.min.js" />
      <Script src="assets/js/bootstrap.bundle.min.js" />
      <Script src="assets/vendor/owl-carousel/owl.carousel.min.js" />
      <Script src="assets/vendor/isotope/isotope.pkgd.min.js" />
      <Script src="assets/vendor/nice-select/js/jquery.nice-select.min.js" />
      <Script src="assets/vendor/fancybox/js/jquery.fancybox.min.js" />
      <Script src="assets/vendor/wow/wow.min.js" /> 
      <Script src="assets/vendor/animateNumber/jquery.animateNumber.min.js" />
      <Script src="assets/vendor/waypoints/jquery.waypoints.min.js" />
      {/* <Script src="assets/js/google-maps.js" /> */}
      <Script src="assets/js/topbar-virtual.js" />
    </html>
  );
}
