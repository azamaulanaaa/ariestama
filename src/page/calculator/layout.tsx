import {
  ChangeEventHandler,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { Outlet } from "react-router";

import { useShareAsImage } from "@/hook/useShareAsImage.ts";
import {
  NaviationMenu,
  NavigationMenuItem,
} from "@/component/navigation_menu/mod.tsx";
import { useSearch } from "@/hook/useSearch.ts";

const NAVIGATION_MENU_ITEMS: Array<NavigationMenuItem> = [
  { href: "apar/unit_count", value: "Alat Pemadam Api Ringan - Unit Count" },
  {
    href: "bejana_tekan/pipe_thickness",
    value: "Bejana Tekan - Pipe Thickness",
  },
  {
    href: "boiler/drum_water_tube_thickness",
    value: "Boiler - Drum Water Tube Thickness",
  },
  { href: "boiler/pipe_thickness", value: "Boiler - Pipe Thickness" },
  {
    href: "boiler/safety_valve_diameter",
    value: "Boiler - Safety Valve Diameter",
  },
  {
    href: "boiler/shell_fire_tube_thickness",
    value: "Boiler - Shell Fire Tube Thickness",
  },
  { href: "boiler/tube_hole_thickness", value: "Boiler - Tube Hole Thickness" },
  { href: "chain/swl_block", value: "Chain - SWL Block" },
  { href: "chain/swl_sling", value: "Chain - SWL Sling" },
  { href: "forklift/swl_fork", value: "Forklift - SWL Fork" },
  { href: "general/volume", value: "General - Volume" },
  { href: "girder/deflection", value: "Girder - Deflection" },
  { href: "hydrant/reservoir_capacity", value: "Hydrant - Reservoir Capacity" },
  {
    href: "ipp/radius_conventional",
    value: "Instalasi Penyalur Petir - Radius Conventional",
  },
  {
    href: "lingkungan/anchor_resultante",
    value: "Lingkungan - Anchor Resultante",
  },
  { href: "rope/swl_wire_rope", value: "Rope - SWL Wire Rope" },
  {
    href: "tangki_timbun/thickness",
    value: "Tangki Timbun - Thickness",
  },
];

export const CalculatorLayout = () => {
  const [shareRef, share] = useShareAsImage();
  const menuModalRef = useRef(null);
  const [menuQuery, setMenuQuery] = useState("");
  const filteredItem = useSearch(
    menuQuery,
    NAVIGATION_MENU_ITEMS.map((value) => ({
      keywords: [value.value],
      ...value,
    })),
  );

  useEffect(() => {
    document.title = "Calculator - Safety";
  }, []);

  const handleMenuClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();

    if (menuModalRef.current != null) {
      const menuModal = menuModalRef.current as HTMLDialogElement;
      menuModal.showModal();
    }
  };

  const handleMenuQueryChange: ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    const target = event.target as HTMLInputElement;

    setMenuQuery(target.value);
  };

  const handleNavigationMenuClick: MouseEventHandler<HTMLDivElement> = (
    _event,
  ) => {
    if (menuModalRef.current != null) {
      const menuModal = menuModalRef.current as HTMLDialogElement;
      menuModal.close();
    }

    setMenuQuery("");
  };

  return (
    <div className="flex flex-col gap-2 p-2 mx-auto max-w-[500px]">
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <button type="button" className="btn" onClick={handleMenuClick}>
            Menu
          </button>
          <dialog ref={menuModalRef} className="modal">
            <div className="modal-box flex flex-col gap-2">
              <label className="input w-full shrink-0">
                <input
                  type="text"
                  value={menuQuery}
                  onChange={handleMenuQueryChange}
                />
              </label>
              <div onClick={handleNavigationMenuClick}>
                <NaviationMenu
                  className="w-full flex-nowrap overflow-y-auto"
                  items={filteredItem}
                />
              </div>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button type="submit">Close</button>
            </form>
          </dialog>
        </div>
      </div>
      <div ref={shareRef}>
        <Outlet />
      </div>
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <button type="button" className="btn" onClick={share}>
            Share
          </button>
        </div>
      </div>
    </div>
  );
};
