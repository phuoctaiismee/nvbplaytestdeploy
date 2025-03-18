import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const CartFeature = dynamic(() => import("@/features/cart"));
const CartPage = async () => {
    const nextCookie = await cookies();
    const token = nextCookie.get("token");
    if(!token) redirect("/auth?redirect=/cart"); 
  return <CartFeature />;
};

export default CartPage;
