import dynamic from "next/dynamic"
import { memo, useState } from "react"
import { AddProductToWishListProps } from "./AddProductToWishlist"

const AddProductToWishlist = dynamic<AddProductToWishListProps>(() => {
   return import('./AddProductToWishlist').then(mod => mod.AddProductToWishlist)
}, {
    loading: () => <span>Carrengando...</span>
})

interface ProductItemProps {
    product: {
        id: number
        title: string
        price: number
        formatedPrice: string
    }
    onAddToWishlist: (id: number) => void
}

function ProductItemComponent({ product, onAddToWishlist }: ProductItemProps) {
    const [isAddingToWishList, setIsAddingToWishList] = useState(false)

    return (
        <div>
            {product.title} - <strong>{product.formatedPrice}</strong>
            <button onClick={() => setIsAddingToWishList(true)}>
                Adicionar aos favoritos
            </button>

            {!!isAddingToWishList && (
                <AddProductToWishlist 
                    onAddToWishList={() => onAddToWishlist(product.id)}
                    onRequestClose={() => setIsAddingToWishList(false)}
                />
            )}
        </div>
    )
}

export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
    return Object.is(prevProps.product, nextProps.product)
})

/**
 * When use memo
 * 1. Pure Functional Components
 * 2. Renders too often
 * 3. Re-render with same props
 * 4. Medium to big size
 */