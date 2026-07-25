import Image from "next/image";
import {SixGrid} from "@/components/grid/SixGrid";

export default function Home() {
  return (

      <section className="max-w-278.75 pt-10 md:pr-0 md:pl-0 pl-4 pr-4 flex flex-col gap-10 ">
          <div className="w-full flex flex-col gap-10 md:pl-0 md:pr-0 pl-3 pr-3 ">
              <div className="md:pl-45 md:pr-45 flex flex-col gap-2 items-center justify-center ">
                  <h2 className={"text-mainRed text-center"}>Chez vous, partout et ailleurs</h2>
                  <p className={"text-center"}>Avec Kasa, vivez des séjours uniques dans des hébergements chaleureux, sélectionnés avec soin par nos hôtes.</p>
              </div>
              <div className="relative w-full h-114.5 overflow-hidden rounded-[20px]">
                  <Image
                      src="/home/homeheader.svg"
                      fill
                      alt="Image de maison en bois dans une plaine"
                      className="object-cover"
                  />
              </div>
          </div>

          <SixGrid></SixGrid>


      </section>

  )
}
