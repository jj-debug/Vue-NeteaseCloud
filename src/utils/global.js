import { Carousel, CarouselItem ,Pagination, Dropdown, DropdownMenu, DropdownItem} from 'element-ui'

const components = [
    Carousel,
    CarouselItem,
    Pagination,
    Dropdown, 
    DropdownMenu,
    DropdownItem
];

export default {
    install(Vue) {
        components.forEach(item => {
            Vue.component(item.name, item);
        });
    }
}