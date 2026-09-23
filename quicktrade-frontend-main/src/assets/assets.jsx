import bag from './bag.jpg'
import bag1 from './bag1.jpg'
import bag2 from './bag2.jpg'
import bag3 from './bag3.jpg'
import bag4 from './bag4.jpg'
import bag5 from './bag5.jpg'

import car from './car.jpg'
import car1 from './car1.jpg'
import car2 from './car2.jpg'
import car3 from './car3.jpg'
import car4 from './car4.jpg'
import car5 from './car5.jpg'

import clip from './clip.mp4'
import clip1 from './clip1.mp4'
import clip2 from './clip2.mp4'
import clip3 from './clip3.mp4'
import clip4 from './clip4.mp4'
import clip5 from './clip5.mp4'

import cover from './cover.jpg'
import cover1 from './cover1.jpg'
import cover2 from './cover2.jpg'
import cover3 from './cover3.jpg'
import cover4 from './cover4.jpg'
import cover5 from './cover5.jpg'

import cloth from './cloth.jpg'
import cloth1 from './cloth1.jpg'
import cloth2 from './cloth2.jpg'
import cloth3 from './cloth3.jpg'
import cloth4 from './cloth4.jpg'
import cloth5 from './cloth5.jpg'

import glass from './glass.jpg'
import glass1 from './glass1.jpg'
import glass2 from './glass2.jpg'
import glass3 from './glass3.jpg'
import glass4 from './glass4.jpg'
import glass5 from './glass5.jpg'

import phone from './phone.jpg'
import phone1 from './phone1.jpg'
import phone2 from './phone2.jpg'
import phone3 from './phone3.jpg'
import phone4 from './phone4.jpg'
import phone5 from './phone5.jpg'

import shoe from './shoe.jpg'
import shoe1 from './shoe1.jpg'
import shoe2 from './shoe2.jpg'
import shoe3 from './shoe3.jpg'
import shoe4 from './shoe4.jpg'
import shoe5 from './shoe5.jpg'

import snack from './snack.jpg'
import snack1 from './snack1.jpg'
import snack2 from './snack2.jpg'
import snack3 from './snack3.jpg'
import snack4 from './snack4.jpg'
import snack5 from './snack5.jpg'

import watch from './watch.jpg'
import watch1 from './watch1.jpg'
import watch2 from './watch2.jpg'
import watch3 from './watch3.jpg'
import watch4 from './watch4.jpg'
import watch5 from './watch5.jpg'

import all from "/hero.jpg"
import image from "./profile_image.png"

export const menu_list = [
    { _id: "1", menu_name: "All", menu_image: all },
    { _id: "2", menu_name: "Bags", menu_image: bag },
    { _id: "3", menu_name: "Cars", menu_image: car },
    { _id: "4", menu_name: "Cloths", menu_image: cloth },
    { _id: "5", menu_name: "Glasses", menu_image: glass },
    { _id: "6", menu_name: "Phones", menu_image: phone },
    { _id: "7", menu_name: "Shoes", menu_image: shoe },
    { _id: "8", menu_name: "Snacks", menu_image: snack },
    { _id: "9", menu_name: "Watches", menu_image: watch }
]

export const store_list = [
  { _id: 1, path: `/login`, name: `Wilson's snacks`, image: snack },
  { _id: 2, path: `/login`, name: `Wilson's cars`, image: car },
  { _id: 3, path: `/login`, name: `Wilson's cloths`, image: cloth },
  { _id: 4, path: `/login`, name: `Wilson's shoes`, image: shoe },
  { _id: 5, path: `/login`, name: `Wilson's glasses`, image: glass }
]

export const video_list = [
    { _id: "1", video: clip, cover: cover, image: image, name: `username`, likes: `68`, save: `12`, share: `24`, comments: `15`, caption: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, explicabo!` },
    { _id: "2", video: clip1, cover: cover1, image: image, name: `username`, likes: `68`, save: `12`, share: `24`, comments: `15`, caption: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, explicabo!` },
    { _id: "3", video: clip2, cover: cover2, image: image, name: `username`, likes: `68`, save: `12`, share: `24`, comments: `15`, caption: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, explicabo!` },
    { _id: "4", video: clip3, cover: cover3, image: image, name: `username`, likes: `68`, save: `12`, share: `24`, comments: `15`, caption: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, explicabo!` },
    { _id: "5", video: clip4, cover: cover4, image: image, name: `username`, likes: `68`, save: `12`, share: `24`, comments: `15`, caption: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, explicabo!` },
    { _id: "6", video: clip5, cover: cover5, image: image, name: `username`, likes: `68`, save: `12`, share: `24`, comments: `15`, caption: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, explicabo!` }
]

export const product_list = [
    {
        _id: "1",
        name: "Lorem ipsum dolor amet.",
        image: bag,
        price: 12,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam dolor aliquid eos? Rerum, corrupti delectus voluptates consectetur earum quis doloremque!",
        category: "Bags"
    }, {
        _id: "2",
        name: "Lorem ipsum dolor amet.",
        image: bag1,
        price: 18,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam dolor aliquid eos? Rerum, corrupti delectus voluptates consectetur earum quis doloremque!",
        category: "Bags"
    }, {
        _id: "3",
        name: "Lorem ipsum dolor amet.",
        image: bag2,
        price: 16,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam dolor aliquid eos? Rerum, corrupti delectus voluptates consectetur earum quis doloremque!",
        category: "Bags"
    }, {
        _id: "4",
        name: "Lorem ipsum dolor amet.",
        image: bag3,
        price: 24,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam dolor aliquid eos? Rerum, corrupti delectus voluptates consectetur earum quis doloremque!",
        category: "Bags"
    }, {
        _id: "5",
        name: "Lorem ipsum dolor amet.",
        image: bag4,
        price: 24,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam dolor aliquid eos? Rerum, corrupti delectus voluptates consectetur earum quis doloremque!",
        category: "Bags"
    }, {
        _id: "6",
        name: "Lorem ipsum dolor amet.",
        image: bag5,
        price: 24,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam dolor aliquid eos? Rerum, corrupti delectus voluptates consectetur earum quis doloremque!",
        category: "Bags"
    }, {
        _id: "7",
        name: "Lorem ipsum dolor amet.",
        image: car,
        price: 14,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam dolor aliquid eos? Rerum, corrupti delectus voluptates consectetur earum quis doloremque!",
        category: "Cars"
    }, {
        _id: "8",
        name: "Lorem ipsum dolor amet.",
        image: car1,
        price: 12,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam dolor aliquid eos? Rerum, corrupti delectus voluptates consectetur earum quis doloremque!",
        category: "Cars"
    }, {
        _id: "9",
        name: "Lorem ipsum dolor amet.",
        image: car2,
        price: 20,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam dolor aliquid eos? Rerum, corrupti delectus voluptates consectetur earum quis doloremque!",
        category: "Cars"
    }, {
        _id: "10",
        name: "Lorem ipsum dolor amet.",
        image: car3,
        price: 15,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam dolor aliquid eos? Rerum, corrupti delectus voluptates consectetur earum quis doloremque!",
        category: "Cars"
    }, {
        _id: "11",
        name: "Lorem ipsum dolor amet.",
        image: car4,
        price: 14,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam dolor aliquid eos? Rerum, corrupti delectus voluptates consectetur earum quis doloremque!",
        category: "Cars"
    }, {
        _id: "12",
        name: "Lorem ipsum dolor amet.",
        image: car5,
        price: 14,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam dolor aliquid eos? Rerum, corrupti delectus voluptates consectetur earum quis doloremque!",
        category: "Cars"
    }, {
        _id: "13",
        name: "Lorem ipsum dolor amet.",
        image: cloth,
        price: 14,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam dolor aliquid eos? Rerum, corrupti delectus voluptates consectetur earum quis doloremque!",
        category: "Cloths"
    }, {
        _id: "14",
        name: "Lorem ipsum dolor amet.",
        image: cloth1,
        price: 22,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam dolor aliquid eos? Rerum, corrupti delectus voluptates consectetur earum quis doloremque!",
        category: "Cloths"
    }, {
        _id: "15",
        name: "Lorem ipsum dolor amet.",
        image: cloth2,
        price: 10,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam dolor aliquid eos? Rerum, corrupti delectus voluptates consectetur earum quis doloremque!",
        category: "Cloths"
    }, {
        _id: "16",
        name: "Lorem ipsum dolor amet.",
        image: cloth3,
        price: 12,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam dolor aliquid eos? Rerum, corrupti delectus voluptates consectetur earum quis doloremque!",
        category: "Cloths"
    }, {
        _id: "17",
        name: "Lorem ipsum dolor amet.",
        image: cloth4,
        price: 14,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam dolor aliquid eos? Rerum, corrupti delectus voluptates consectetur earum quis doloremque!",
        category: "Cloths"
    }, {
        _id: "18",
        name: "Lorem ipsum dolor amet.",
        image: cloth5,
        price: 14,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam dolor aliquid eos? Rerum, corrupti delectus voluptates consectetur earum quis doloremque!",
        category: "Cloths"
    }, {
        _id: "19",
        name: "Lorem ipsum dolor amet.",
        image: glass,
        price: 12,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam dolor aliquid eos? Rerum, corrupti delectus voluptates consectetur earum quis doloremque!",
        category: "Glasses"
    }, {
        _id: "20",
        name: "Lorem ipsum dolor amet.",
        image: glass1,
        price: 18,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam dolor aliquid eos? Rerum, corrupti delectus voluptates consectetur earum quis doloremque!",
        category: "Glasses"
    }, {
        _id: "21",
        name: "Lorem ipsum dolor amet.",
        image: glass2,
        price: 16,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam dolor aliquid eos? Rerum, corrupti delectus voluptates consectetur earum quis doloremque!",
        category: "Glasses"
    }, {
        _id: "22",
        name: "Lorem ipsum dolor amet.",
        image: glass3,
        price: 24,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam dolor aliquid eos? Rerum, corrupti delectus voluptates consectetur earum quis doloremque!",
        category: "Glasses"
    }, {
        _id: "23",
        name: "Lorem ipsum dolor amet.",
        image: glass4,
        price: 24,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam dolor aliquid eos? Rerum, corrupti delectus voluptates consectetur earum quis doloremque!",
        category: "Glasses"
    }, {
        _id: "24",
        name: "Lorem ipsum dolor amet.",
        image: glass5,
        price: 24,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam dolor aliquid eos? Rerum, corrupti delectus voluptates consectetur earum quis doloremque!",
        category: "Glasses"
    }, {
        _id: "25",
        name: "Lorem ipsum dolor amet.",
        image: phone,
        price: 14,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam dolor aliquid eos? Rerum, corrupti delectus voluptates consectetur earum quis doloremque!",
        category: "Phones"
    }, {
        _id: "26",
        name: "Lorem ipsum dolor amet.",
        image: phone1,
        price: 12,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam dolor aliquid eos? Rerum, corrupti delectus voluptates consectetur earum quis doloremque!",
        category: "Phones"
    }, {
        _id: "27",
        name: "Lorem ipsum dolor amet.",
        image: phone2,
        price: 20,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam dolor aliquid eos? Rerum, corrupti delectus voluptates consectetur earum quis doloremque!",
        category: "Phones"
    }, {
        _id: "28",
        name: "Lorem ipsum dolor amet.",
        image: phone3,
        price: 15,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam dolor aliquid eos? Rerum, corrupti delectus voluptates consectetur earum quis doloremque!",
        category: "Phones"
    }, {
        _id: "29",
        name: "Lorem ipsum dolor amet.",
        image: phone4,
        price: 14,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam dolor aliquid eos? Rerum, corrupti delectus voluptates consectetur earum quis doloremque!",
        category: "Phones"
    }, {
        _id: "30",
        name: "Lorem ipsum dolor amet.",
        image: phone5,
        price: 14,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam dolor aliquid eos? Rerum, corrupti delectus voluptates consectetur earum quis doloremque!",
        category: "Phones"
    }, {
        _id: "31",
        name: "Lorem ipsum dolor amet.",
        image: shoe,
        price: 14,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam dolor aliquid eos? Rerum, corrupti delectus voluptates consectetur earum quis doloremque!",
        category: "Shoes"
    }, {
        _id: "32",
        name: "Lorem ipsum dolor amet.",
        image: shoe1,
        price: 22,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam dolor aliquid eos? Rerum, corrupti delectus voluptates consectetur earum quis doloremque!",
        category: "Shoes"
    }, {
        _id: "33",
        name: "Lorem ipsum dolor amet.",
        image: shoe2,
        price: 10,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam dolor aliquid eos? Rerum, corrupti delectus voluptates consectetur earum quis doloremque!",
        category: "Shoes"
    }, {
        _id: "34",
        name: "Lorem ipsum dolor amet.",
        image: shoe3,
        price: 12,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam dolor aliquid eos? Rerum, corrupti delectus voluptates consectetur earum quis doloremque!",
        category: "Shoes"
    }, {
        _id: "35",
        name: "Lorem ipsum dolor amet.",
        image: shoe4,
        price: 14,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam dolor aliquid eos? Rerum, corrupti delectus voluptates consectetur earum quis doloremque!",
        category: "Shoes"
    }, {
        _id: "36",
        name: "Lorem ipsum dolor amet.",
        image: shoe5,
        price: 14,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam dolor aliquid eos? Rerum, corrupti delectus voluptates consectetur earum quis doloremque!",
        category: "Shoes"
    }, {
        _id: "37",
        name: "Lorem ipsum dolor amet.",
        image: snack,
        price: 12,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam dolor aliquid eos? Rerum, corrupti delectus voluptates consectetur earum quis doloremque!",
        category: "Snacks"
    }, {
        _id: "38",
        name: "Lorem ipsum dolor amet.",
        image: snack1,
        price: 18,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam dolor aliquid eos? Rerum, corrupti delectus voluptates consectetur earum quis doloremque!",
        category: "Snacks"
    }, {
        _id: "39",
        name: "Lorem ipsum dolor amet.",
        image: snack2,
        price: 16,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam dolor aliquid eos? Rerum, corrupti delectus voluptates consectetur earum quis doloremque!",
        category: "Snacks"
    }, {
        _id: "40",
        name: "Lorem ipsum dolor amet.",
        image: snack3,
        price: 24,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam dolor aliquid eos? Rerum, corrupti delectus voluptates consectetur earum quis doloremque!",
        category: "Snacks"
    }, {
        _id: "41",
        name: "Lorem ipsum dolor amet.",
        image: snack4,
        price: 24,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam dolor aliquid eos? Rerum, corrupti delectus voluptates consectetur earum quis doloremque!",
        category: "Snacks"
    }, {
        _id: "42",
        name: "Lorem ipsum dolor amet.",
        image: snack5,
        price: 24,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam dolor aliquid eos? Rerum, corrupti delectus voluptates consectetur earum quis doloremque!",
        category: "Snacks"
    }, {
        _id: "43",
        name: "Lorem ipsum dolor amet.",
        image: watch,
        price: 14,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam dolor aliquid eos? Rerum, corrupti delectus voluptates consectetur earum quis doloremque!",
        category: "Watches"
    }, {
        _id: "44",
        name: "Lorem ipsum dolor amet.",
        image: watch1,
        price: 12,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam dolor aliquid eos? Rerum, corrupti delectus voluptates consectetur earum quis doloremque!",
        category: "Watches"
    }, {
        _id: "45",
        name: "Lorem ipsum dolor amet.",
        image: watch2,
        price: 20,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam dolor aliquid eos? Rerum, corrupti delectus voluptates consectetur earum quis doloremque!",
        category: "Watches"
    }, {
        _id: "46",
        name: "Lorem ipsum dolor amet.",
        image: watch3,
        price: 15,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam dolor aliquid eos? Rerum, corrupti delectus voluptates consectetur earum quis doloremque!",
        category: "Watches"
    }, {
        _id: "47",
        name: "Lorem ipsum dolor amet.",
        image: watch4,
        price: 20,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam dolor aliquid eos? Rerum, corrupti delectus voluptates consectetur earum quis doloremque!",
        category: "Watches"
    }, {
        _id: "48",
        name: "Lorem ipsum dolor amet.",
        image: watch5,
        price: 20,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam dolor aliquid eos? Rerum, corrupti delectus voluptates consectetur earum quis doloremque!",
        category: "Watches"
    }
]