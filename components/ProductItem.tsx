import { memo } from "react"

interface ProductItemProps {
    product: {
        id: number
        title: string
        price: number
        formatedPrice: string
    }
    onAddToWhishlist: (id: number) => void
}

function ProductItemComponent({ product, onAddToWhishlist }: ProductItemProps) {
    return (
        <div>
            {product.title} - <strong>{product.formatedPrice}</strong>
            <button onClick={() => onAddToWhishlist(product.id)}>
                Add to whislist
            </button>
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