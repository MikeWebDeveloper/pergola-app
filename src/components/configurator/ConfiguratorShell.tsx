'use client';

import React, { useState } from 'react';
import useConfigStore from '@/store/config';
import { materials, roofTypes, accessories } from '@/data/products';
import { calculatePrice } from '@/lib/pricing';
import { validatePergolaConfig } from '@/lib/rules';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';
import Pergola3D from '@/components/visualization/Pergola3D';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import { Toaster } from "sonner";
import { Button } from "@/components/ui/button";

function OptionsPanel() {
  const { config, setConfig } = useConfigStore();
  const [widthError, setWidthError] = useState('');
  const [lengthError, setLengthError] = useState('');
  const [heightError, setHeightError] = useState('');

  const handleAccessoryChange = (accessoryId: string, checked: boolean | 'indeterminate') => {
    const currentAccessories = config.accessories;
    if (checked) {
      setConfig({ accessories: [...currentAccessories, accessoryId] });
    } else {
      setConfig({ accessories: currentAccessories.filter((id) => id !== accessoryId) });
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">Customize Your Pergola</CardTitle>
        <CardDescription className="text-xs text-muted-foreground">Select your options to see a live preview and price.</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow py-2">
        <ScrollArea className="h-full pr-4">
          <Accordion type="multiple" defaultValue={['item-1', 'item-2', 'item-3', 'item-4', 'item-style', 'item-color']} className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-sm">Dimensions</AccordionTrigger>
              <AccordionContent className="space-y-3 pt-2">
                <p className="text-xs text-muted-foreground">
                  Specify the overall size of your pergola in meters.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <Label htmlFor="width" className="text-xs">Width</Label>
                    <input
                      type="number"
                      id="width"
                      value={config.width}
                      min={2}
                      max={10}
                      step={0.1}
                      onChange={(e) => {
                        const value = parseFloat(e.target.value);
                        const newConfig = { ...config, width: value };
                        const validation = validatePergolaConfig(newConfig);
                        if (validation.messages.width) {
                          setWidthError(validation.messages.width);
                        } else {
                          setWidthError('');
                          setConfig({ width: value || 0 });
                        }
                      }}
                      className="w-full mt-1 p-1 text-sm border rounded-md bg-input"
                    />
                    {widthError && <p className="text-red-500 text-xs mt-1">{widthError}</p>}
                  </div>
                  <div>
                    <Label htmlFor="length" className="text-xs">Length</Label>
                    <input
                      type="number"
                      id="length"
                      value={config.length}
                      min={2}
                      max={15}
                      step={0.1}
                      onChange={(e) => {
                        const value = parseFloat(e.target.value);
                        const newConfig = { ...config, length: value };
                        const validation = validatePergolaConfig(newConfig);
                        if (validation.messages.length) {
                          setLengthError(validation.messages.length);
                        }
                        else {
                          setLengthError('');
                          setConfig({ length: value || 0 });
                        }
                      }}
                      className="w-full mt-1 p-1 text-sm border rounded-md bg-input"
                    />
                    {lengthError && <p className="text-red-500 text-xs mt-1">{lengthError}</p>}
                  </div>
                  <div>
                    <Label htmlFor="height" className="text-xs">Height</Label>
                    <input
                      type="number"
                      id="height"
                      value={config.height}
                      min={2.2}
                      max={4}
                      step={0.1}
                      onChange={(e) => {
                        const value = parseFloat(e.target.value);
                        const newConfig = { ...config, height: value };
                        const validation = validatePergolaConfig(newConfig);
                        if (validation.messages.height) {
                          setHeightError(validation.messages.height);
                        } else {
                          setHeightError('');
                          setConfig({ height: value || 0 });
                        }
                      }}
                      className="w-full mt-1 p-1 text-sm border rounded-md bg-input"
                    />
                    {heightError && <p className="text-red-500 text-xs mt-1">{heightError}</p>}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-style">
              <AccordionTrigger className="text-sm">Pergola Style</AccordionTrigger>
              <AccordionContent className="space-y-2 pt-2">
                <p className="text-xs text-muted-foreground">
                  Choose the type of pergola structure.
                </p>
                <RadioGroup 
                  value={config.style}
                  onValueChange={(value: 'freestanding' | 'attached') => setConfig({ style: value })}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="freestanding" id="r1" className="w-3 h-3" />
                    <Label htmlFor="r1" className="text-xs">Freestanding</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="attached" id="r2" className="w-3 h-3" />
                    <Label htmlFor="r2" className="text-xs">Attached</Label>
                  </div>
                </RadioGroup>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-sm">Material</AccordionTrigger>
              <AccordionContent className="space-y-2 pt-2">
                <p className="text-xs text-muted-foreground">
                  Choose the primary material for the pergola frame.
                </p>
                <Select value={config.material} onValueChange={(value) => {
                  setConfig({ material: value });
                  const selectedMaterial = materials.find(m => m.id === value);
                  if (selectedMaterial && selectedMaterial.colors.length > 0) {
                    setConfig({ color: selectedMaterial.colors[0].hex }); // Set default color for new material
                  }
                }}>
                  <SelectTrigger className="text-xs h-8">
                    <SelectValue placeholder="Select a material" />
                  </SelectTrigger>
                  <SelectContent className="text-xs">
                    {materials.map((material) => (
                      <SelectItem key={material.id} value={material.id} className="text-xs">
                        {material.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                 <p className="text-xs text-muted-foreground px-1 pt-1">
                  {materials.find(m => m.id === config.material)?.description}
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-color">
              <AccordionTrigger className="text-sm">Color & Finish</AccordionTrigger>
              <AccordionContent className="space-y-2 pt-2">
                <p className="text-xs text-muted-foreground">
                  Select the color or finish for your chosen material.
                </p>
                <Select value={config.color} onValueChange={(value) => setConfig({ color: value })}>
                  <SelectTrigger className="text-xs h-8">
                    <SelectValue placeholder="Select a color" />
                  </SelectTrigger>
                  <SelectContent className="text-xs">
                    {materials.find(m => m.id === config.material)?.colors.map((color) => (
                      <SelectItem key={color.id} value={color.hex} className="text-xs">
                        <div className="flex items-center gap-1">
                          <div
                            className="w-3 h-3 rounded-full border border-gray-300"
                            style={{ backgroundColor: color.hex }}
                          ></div>
                          {color.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-sm">Roof Type</AccordionTrigger>
              <AccordionContent className="space-y-2 pt-2">
                 <p className="text-xs text-muted-foreground">
                  Select the type of roof for sun and rain protection.
                </p>
                <Select value={config.roofType} onValueChange={(value) => setConfig({ roofType: value })}>
                  <SelectTrigger className="text-xs h-8">
                    <SelectValue placeholder="Select a roof type" />
                  </SelectTrigger>
                  <SelectContent className="text-xs">
                    {roofTypes.map((roof) => (
                      <SelectItem key={roof.id} value={roof.id} className="text-xs">
                        {roof.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground px-1 pt-1">
                  {roofTypes.find(r => r.id === config.roofType)?.description}
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-sm">Accessories</AccordionTrigger>
              <AccordionContent className="space-y-3 pt-2">
                <p className="text-xs text-muted-foreground">
                  Enhance your pergola with optional add-ons.
                </p>
                {accessories.map((accessory) => (
                  <div key={accessory.id} className="flex items-center space-x-2 text-xs">
                    <Checkbox
                      id={accessory.id}
                      checked={config.accessories.includes(accessory.id)}
                      onCheckedChange={(checked) => handleAccessoryChange(accessory.id, checked)}
                      className="w-3 h-3"
                    />
                    <Label htmlFor={accessory.id} className="text-xs">
                      {accessory.name} - {accessory.price.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' })}
                    </Label>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

function PriceDisplay() {
  const { config } = useConfigStore();
  const priceDetails = calculatePrice(config);
  const [showFullDisclaimer, setShowFullDisclaimer] = useState(false);

  return (
    <Card className="w-full flex-shrink-0 text-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">Price Estimate</CardTitle>
      </CardHeader>
      <CardContent className="py-2 space-y-1">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Posts & Beams</span>
          <span className="font-medium">{priceDetails.materialPrice.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' })}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Rafters</span>
          <span className="font-medium">{priceDetails.roofPrice.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' })}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Roof System</span>
          <span className="font-medium">{priceDetails.roofPrice.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' })}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Accessories</span>
          <span className="font-medium">{priceDetails.accessoriesPrice.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' })}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Estimated Installation</span>
          <span className="font-medium">{priceDetails.installationPrice.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' })}</span>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-1 pt-2">
        <div className="flex justify-between w-full">
          <span className="text-base font-semibold">Total Price</span>
          <span className="text-lg font-bold">{priceDetails.totalPrice.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' })}</span>
        </div>
        <CardDescription className="text-xs text-muted-foreground leading-tight">
          This is an estimated price for the supply of materials only. It does not include VAT, delivery, or installation.
        </CardDescription>
        <Button
          variant="link"
          onClick={() => setShowFullDisclaimer(!showFullDisclaimer)}
          className="h-auto p-0 text-xs text-muted-foreground underline"
        >
          {showFullDisclaimer ? 'Show less' : 'Read full disclaimer'}
        </Button>
        {showFullDisclaimer && (
          <p className="text-xs text-muted-foreground leading-tight mt-1">
            The estimated price provided is for materials only and is subject to change. It does not include Value Added Tax (VAT), shipping costs, or professional installation fees. Final pricing may vary based on material availability, specific customization requests, and regional market conditions. For a precise quote, please contact our sales team.
          </p>
        )}
        <SignedIn>
          <Button className="mt-2 w-full text-sm">Save Configuration</Button>
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal">
            <Button className="w-full text-sm">Sign In to Save</Button>
          </SignInButton>
        </SignedOut>
      </CardFooter>
    </Card>
  );
}

function VisualizationCanvas() {
  return (
    <Card className="flex-grow min-h-[300px] flex items-center justify-center">
      <Pergola3D />
    </Card>
  );
}

export default function ConfiguratorShell() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-4 px-2 sm:px-4 lg:px-6">
      <div className="w-full max-w-4xl h-[calc(100vh-2rem)] mx-auto grid grid-rows-[auto_1fr] lg:grid-rows-1 lg:grid-cols-[350px_1fr] gap-4">
        <div className="w-full lg:w-[350px] lg:h-full lg:flex-shrink-0 row-span-1">
          <OptionsPanel />
        </div>
        <main className="flex-grow w-full flex flex-col gap-4 row-span-1 lg:col-span-1">
          <VisualizationCanvas />
          <PriceDisplay />
        </main>
        <Toaster />
      </div>
    </div>
  );
} 