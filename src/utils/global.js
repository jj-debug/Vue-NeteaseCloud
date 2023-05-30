import { Carousel, 
    CarouselItem,
    Pagination, 
    Dropdown, 
    DropdownMenu, 
    DropdownItem,
    Menu,
    Submenu,
    MenuItem,
    RadioGroup,
    RadioButton,
} from 'element-ui'

const components = [
    Carousel,
    CarouselItem,
    Pagination,
    Dropdown, 
    DropdownMenu,
    DropdownItem,
    Menu,
    Submenu,
    MenuItem,
    RadioGroup,
    RadioButton,
];

export default {
    install(Vue) {
        components.forEach(item => {
            Vue.component(item.name, item);
        });
    }
}