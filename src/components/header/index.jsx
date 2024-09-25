'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button';
import { Activity, AlignJustify, BriefcaseBusiness, Home, LogIn, LogOut, Milestone, User } from 'lucide-react';
import { Sheet, SheetContent } from '../ui/sheet';
import { SignOutButton, SignedOut, UserButton } from '@clerk/nextjs';
import { redirect, useRouter } from 'next/navigation';
import T from '../t';

function Header({ user, profileInfo }) {
    // console.log(user, profileInfo);
    const menusItems = [
        {
            l: <div className='flex items-center gap-2' ><Home className='w-4 h-4' />Home</div>,
            p: '/',
            s: true
        },
        {
            l: <div className='flex items-center gap-2' ><LogIn className='w-4 h-4' />Login</div>,
            p: '/sign-in',
            s: !user
        }, {
            l: <div className='flex items-center gap-2' ><Milestone className='w-4 h-4' />Signup</div>,
            p: '/sign-up',
            s: !user
        }, {
            l: <div className='flex items-center gap-2' ><BriefcaseBusiness className='w-4 h-4' />Jobs</div>,
            p: '/job',
            s: user
        }, {
            l: <div className='flex items-center gap-2' ><User className='w-4 h-4' />Account</div>,
            p: '/account',
            s: user
        }, {
            l: <div className='flex items-center gap-2' ><Activity className='w-4 h-4' />Activity</div>,
            p: '/activity',
            s: profileInfo?.role === 'candidate'
        }
    ]
    const [showOpenSheet, setShowOpenSheet] = useState(false)
    return (
        <div className='flex items-baseline justify-between py-5 '>
            <div>
                <Link href={'/job'} className="hidden lg:flex" >
                    <div className='flex items-center gap-2' ><BriefcaseBusiness className='w-4 h-4' />JOBS</div>
                </Link>
                <Button onClick={() => setShowOpenSheet(true)}
                    className="lg:hidden"
                >
                    <AlignJustify />
                    <span className='sr-only'>Menu</span>
                </Button>
                <Sheet open={showOpenSheet} onOpenChange={() => setShowOpenSheet(false)}>
                    <SheetContent side='left' >
                        <Link
                            onClick={() => setShowOpenSheet(false)}
                            href={'/job'} className="lg:hidden" >
                            <div className='flex items-center gap-2' ><BriefcaseBusiness className='w-4 h-4' />JOBS</div>
                        </Link>
                        <div className="flex flex-col gap-5 border-t-2 border-b-2 border-gray-400 py-5 mb-5">
                            {
                                menusItems.map((menusItem, ind) => menusItem.s ? <Link
                                    onClick={() => setShowOpenSheet(false)}
                                    className='text-sm font-bold text-gray-950 hover:underline'
                                    key={ind} href={menusItem.p}>{menusItem.l}</Link> : null)
                            }
                        </div>
                        {user && <a href='/sign-out' className='inline-flex text-sm font-bold gap-2 '><LogOut className='w-4 h-4' />Sign Out</a>}

                    </SheetContent>
                </Sheet>
            </div>
            <div className='hidden lg:flex items-center gap-6' >
                
                {
                    menusItems.map((menusItem, ind) => menusItem.s ? <a
                        className='text-sm font-bold text-gray-950 bg-gray-50 hover:bg-gray-900 hover:text-white rounded-md px-3 py-1'
                        key={ind} href={menusItem.p}>{menusItem.l}</a> : null)
                }
                <UserButton afterSwitchSessionUrl='/' />
            </div>
        </div>
    )
}

export default Header