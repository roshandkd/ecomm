"use client";
import { useState } from "react";
import Button from "./UI/button";
import clsx from "clsx";

const Leftsidebar = () => {
  const [active, setActive] = useState("");

  const handleSetActive = (item = "") => {
    setActive(item);
    window.location.href = `/admin?slug=${item}`;
  };

  const adminList = [
    {
      id: 1,
      name: "Category",
      value: "category",
      onClick: () => handleSetActive("category"),
    },
    {
      id: 2,
      name: "Size",
      value: "size",
      onClick: () => handleSetActive("size"),
    },
    {
      id: 3,
      name: "Color",
      value: "color",
      onClick: () => handleSetActive("color"),
    },
    {
      id: 4,
      name: "Product",
      value: "product",
      onClick: () => handleSetActive("product"),
    },
    {
      id: 5,
      name: "Order",
      value: "order",
      onClick: () => handleSetActive("order"),
    },
    {
      id: 6,
      name: "Coupon",
      value: "coupon",
      onClick: () => handleSetActive("coupon"),
    },
  ];

  return (
    <div className="h-full">
      <ul className="flex h-full flex-col gap-3 w-full items-center justify-center">
        {adminList.map(({ name, id, onClick, value }) => (
          <li key={id} className="w-full flex items-center justify-center">
            <Button
              onClick={onClick}
              className={clsx(
                "w-1/2",
                active === value ? "bg-gray-600" : "hover:bg-gray-700"
              )}
            >
              {name}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leftsidebar;
