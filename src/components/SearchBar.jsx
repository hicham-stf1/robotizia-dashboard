import React from 'react'

export default function SearchBar({ value, handleChange }) {
    return (
        <div class="relative">
            <input
                class="border-2 border-orange-500 bg-white h-10 px-5 pr-16 rounded-full text-sm focus:outline-none"
                type="text"
                onChange={handleChange}
                name="search"
                placeholder="Search"
            />
            <button type="submit" class="absolute right-0 top-0 mt-3 mr-4">
                <svg class="text-gray-600 h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path
                        d="M9.777 16.454c-2.867 0-5.258-2.388-5.258-5.258s2.388-5.258 5.258-5.258 5.258 2.388 5.258 5.258-2.391 5.258-5.258 5.258zm8.332 4.018l-4.464-4.464c1.371-1.825 2.198-4.075 2.198-6.512 0-5.377-4.369-9.746-9.746-9.746S1.82 3.301 1.82 8.678s4.369 9.746 9.746 9.746c2.437 0 4.687-.827 6.512-2.198l4.464 4.464c.341.341.901.341 1.242 0 .341-.342.341-.901 0-1.242z"
                    />
                </svg>
            </button>
        </div>

    )
}
